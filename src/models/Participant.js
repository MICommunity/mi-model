Backbone = require('backbone')

Features = require('./Feature').Features

Participant = Backbone.Model.extend({

  initialize: function(){

    this.set("interactor",
      this.get("interaction")
          .get("midata")
          .get("interactors")
          .get(this.get("interactorRef")))

    this.set("features", new Features(this.get("features").map(function(feature) {
      feature.participant = this;
      return feature;
    }, this)));

  },

});

Participants = Backbone.Collection.extend({

  model: Participant

});

module.exports = {Participant, Participants}
