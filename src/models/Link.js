var _ = require('underscore');
var Backbone = require('backbone');

var Link = Backbone.Model.extend({

  initialize: function(d) {}

});

var Links = Backbone.Collection.extend({

  model: Link,

});

module.exports = {Link: Link, Links: Links};
