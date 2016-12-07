_ = require('underscore');
Backbone = require('backbone')
parse = require('../utils/parse.js');

Interactions = require('./Interaction').Interactions;
Interactors = require('./Interactor').Interactors;


Data = Backbone.Model.extend({

  defaults: {
    interactors: new Interactors(),
    interactions: new Interactions()
  },

  initialize: function({data: data}){

    this.get("interactors").add(parse.interactors(data).map(function(interactor) {
      interactor.midata = this;
      return interactor;
    }));

    this.get("interactions").add(parse.interactions(data).map(function(interaction) {
      interaction.midata = this;
      return interaction;
    }, this));


  }

});


module.exports = Data
