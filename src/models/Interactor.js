var _ = require('underscore');

var Backbone = require('backbone');

var Participants = require("./Participant").Participants;

var Interactor = Backbone.Model.extend({

  defaults: {
    participants: new Participants()
  }

});

var Interactors = Backbone.Collection.extend({

  model: Interactor

});

module.exports = {Interactor: Interactor, Interactors: Interactors};
