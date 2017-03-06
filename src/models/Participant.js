_ = require('underscore');
Backbone = require('backbone')

Features = require('./Feature').Features
Feature = require('./Feature').Feature

Participant = Backbone.Model.extend({

  initialize: function(){

    try {
      this.set("interactor",
      this.get("interaction")
          .get("midata")
          .get("interactors")
          .get(this.get("interactorRef")))
    } catch (e) {
      console.log("Error creating iner");

    }

    var features;

    try {

      features = this.get("features").map(function(feature) {
        feature.participant = this;
        return new Feature(feature);
      }, this);

    } catch (e) {
      features = [];
    }


    var featuresCol = new Features(features);


    // this.set("features", featuresCol.reset(features));
    this.set("features", featuresCol);
    // console.log("FCOL", this.get("features"));

    // console.log("COL", featuresCol);
    //

    // if (this.get("features")) {
    //     // console.log("IN HERE");
    //     this.set("features", new Features(this.get("features").map(function(feature) {
    //       feature.participant = this;
    //       return feature;
    //     }, this)));
    // }

  },

});

Participants = Backbone.Collection.extend({

  model: Participant,

  withStoichiometry: function(){
    filtered = this.filter(function(participant) {
      return participant.get("stoichiometry") > 1
    });

    return new Participants(filtered);
  }

});

module.exports = {Participant: Participant, Participants: Participants}
