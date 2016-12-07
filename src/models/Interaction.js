Backbone = require('backbone')

Participants = require('./Participant').Participants
Features = require('./Feature').Features;

Interaction = Backbone.Model.extend({

  defaults: {
    participants: new Participants(),
    features: new Features()
  },

  initialize: function(participants) {

    // Give each participant a reference back to this interaction
    this.set("participants", new Participants(this.get("participants").map(function(participant){
      participant.interaction = this;
      return participant;
    }, this)));

    // Now that participants have been created, add the features to this interaction
    this.get("participants").each(function(participant) {
      participant.get("features").each(function(feature) {
        this.get("features").add(feature);
      }, this);
    }, this);

    // Also, now that all features exist, link them to each other
    this.get("features").each(function(feature) {
      feature.set("linkedFeatures", new Features(feature.get("linkedFeatures").map(function(id) {
        return this.get("features").get(id)
      }, this)));
    }, this);
  }

});

Interactions = Backbone.Collection.extend({

  model: Interaction

});

module.exports = {Interaction, Interactions}
