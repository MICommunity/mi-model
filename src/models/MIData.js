_ = require('underscore');
Backbone = require('backbone')
parse = require('../utils/parse.js');
Interactions = require('./Interaction').Interactions;
Interactors = require('./Interactor').Interactors;
$ = require('jquery');
Promise = require('promise');


Data = Backbone.Model.extend({

  uniprotUrl: "http://www.uniprot.org/uniprot/?format=json&columns=length,id&query=accession:",

  defaults: {
    interactors: new Interactors(),
    interactions: new Interactions()
  },

  initialize: function(data){

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
      return promise.then(function(v){ return {v:v, status: "resolved" }}, function(e){ return {e:e, status: "rejected" }});
    }


    // Fetch the lengths of our participants
    var requests = this.get("interactors").map(function(i){

      return $.get(this.uniprotUrl + i.get("identifier").id,
      function(data) {
        i.set("length", parseInt(data[0]["length"]))
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


module.exports = Data
