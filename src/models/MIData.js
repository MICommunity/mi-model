var _ = require('underscore');
var Backbone = require('backbone');
var parse = require('../utils/parse.js');
var Interactions = require('./Interaction').Interactions;
var Interactors = require('./Interactor').Interactors;
var $ = require('jquery');
var Promise = require('promise');


var Data = Backbone.Model.extend({

  // uniprotUrl: "http://www.uniprot.org/uniprot/?format=json&columns=length,id&query=accession:",
  uniprotUrl: "https://www.ebi.ac.uk/proteins/api/proteins/",

  defaults: {
    interactors: new Interactors(),
    interactions: new Interactions()
  },

  initialize: function(data){

    this.get("interactions").reset();
    this.get("interactors").reset();


    this.get("interactors").add(parse.interactors(data.data).map(function(interactor) {
      interactor.midata = this;
      return interactor;
    }));

    this.get("interactions").add(parse.interactions(data.data).map(function(interaction) {
      interaction.midata = this;
      return interaction;
    }, this));
  },

  load: function() {

    var that = this;

    var reflect = function reflect(promise) {
      return promise.then(function(v){ return {v:v, status: "resolved" };}, function(e){ return {e:e, status: "rejected" };});
    };


    // Fetch the lengths of our participants
    var requests = this.get("interactors").map(function(i){

      return $.ajax({
        url: this.uniprotUrl + i.get("identifier").id,
        type: "GET",
        headers: {
          "Accept": "application/json"
        }
      }).done(function(data) {
        i.set("length", data.sequence.length);
      });


    }, this);




    // Return a promise that resolves when all length requests have finished
    var loadedPromise = new Promise(function (resolve, reject) {

      // var x = $.when.apply("this", requests);
      // x.done(function(r) {
      //   console.log("RESOLVING");
      //   resolve(that);
      // });

      // console.log("HI", requests);

      Promise.all(requests.map(reflect)).then(function(results){
        resolve(that);
      });


    });

    return loadedPromise;

  }

});


module.exports = Data;
