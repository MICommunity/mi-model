Backbone = require('backbone')

Link = Backbone.Model.extend({

  initialize: function(d) {}

});

Links = Backbone.Collection.extend({

  model: Link,

});

module.exports = {Link, Links}
