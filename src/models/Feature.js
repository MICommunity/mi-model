_ = require('underscore');
Backbone = require('backbone');

Regions = require('./Region').Regions;

Feature = Backbone.Model.extend({

  initialize: function(inited) {

    // Upgrade the feature's sequence data to a Region model
    this.set("sequenceData", new Regions(_.map(this.get("sequenceData"), (function(region){
      region.feature = this;
      return region;
    }, this))));
  }

});

Features = Backbone.Collection.extend({

  model: Feature

});

module.exports = {Feature: Feature, Features: Features}
