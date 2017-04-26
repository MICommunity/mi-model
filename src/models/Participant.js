// _ = require('underscore');
var _ = require("underscore");
var Backbone = require('backbone');

var Features = require('./Feature').Features;
var Feature = require('./Feature').Feature;

var Participant = Backbone.Model.extend({

  initialize: function(){

    try {
      this.set("interactor",
      this.get("interaction")
          .get("midata")
          .get("interactors")
          .get(this.get("interactorRef")));
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

var Participants = Backbone.Collection.extend({

  model: Participant

});

module.exports = {Participant: Participant, Participants: Participants};
