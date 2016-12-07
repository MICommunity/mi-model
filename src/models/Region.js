Backbone = require('backbone')

Region = Backbone.Model.extend({

  initialize: function() {

    // Parse start and end values of the region. Null if unknown.
    var [start, end] = this.get("pos").split("-");
    isNaN(parseInt(start)) ? this.set("start", null) : this.set("start", parseInt(start));
    isNaN(parseInt(end)) ? this.set("end", null) : this.set("end", parseInt(end));

  }

});

Regions = Backbone.Collection.extend({

  model: Region

});

module.exports = {Region, Regions}
