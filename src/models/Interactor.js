Backbone = require('backbone')

Participants = require("./Participant").Participants

Interactor = Backbone.Model.extend({

  defaults: {
    participants: new Participants()
  }

});

Interactors = Backbone.Collection.extend({

  model: Interactor

});

module.exports = {Interactor, Interactors}
