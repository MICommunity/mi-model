var _ = require('underscore');
var Backbone = require('backbone');

var Participants = require('./Participant').Participants;
var Features = require('./Feature').Features;
var Links = require('./Link').Links;

var Interaction = Backbone.Model.extend({

  defaults: {
    participants: new Participants(),
    features: new Features(),
    links: new Links()
  },

  initialize: function(participants) {



    // Give each participant a reference back to this interaction
    this.set("participants", new Participants(this.get("participants").map(function(participant){
      participant.interaction = this;
      return participant;
    }, this)));





    // Now that participants have been created, add the features to this interaction
    try {
      this.get("participants").each(function(participant) {
        participant.get("features").each(function(feature) {
          this.get("features").add(feature);
        }, this);
      }, this);
    } catch (e) {
      console.log("OOPS", e);
      // No participants
    }

    // Also, now that all features exist, link them to each other
    this.get("features").each(function(feature) {
      feature.set("linkedFeatures", new Features(_.map(feature.get("linkedFeatures"), function(id) {
        return this.get("features").get(id);
      }, this)));
    }, this);


    // Populate the features collection
    // TODO: Avoid Duplicates
    this.get("features").each(function(feature) {
      var links = new Links();
      feature.get("linkedFeatures").each(function(f) {
        links.add(f);
      });
      links.add(feature);
      this.get("links").add({features: links});
    }, this);

  }

});

var Interactions = Backbone.Collection.extend({

  model: Interaction

});

module.exports = {Interaction: Interaction, Interactions: Interactions};
