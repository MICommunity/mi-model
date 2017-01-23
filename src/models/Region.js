Backbone = require('backbone')

var Region = Backbone.Model.extend({

  initialize: function() {

    // Parse start and end values of the region. Null if unknown.
    try {
      var s = this.get("pos").split("-");
      var start = s[0];
      var end = s[1];

      isNaN(parseInt(start)) ? this.set("start", null) : this.set("start", parseInt(start));
      isNaN(parseInt(end)) ? this.set("end", null) : this.set("end", parseInt(end));

    } catch (e) {
      // No region data
    }

  }

});

var Regions = Backbone.Collection.extend({

  model: Region

});

module.exports = {Region: Region, Regions: Regions}
