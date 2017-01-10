# MI-Model

A NodeJS package for parsing Molecular Interaction JSON data produced by JAMI

## Installation

via npm
```bash
npm install --save mi-model
```
```javascript
MIModel = require('mi-model');
```
via bower
```bash
bower install --save mi-model
```
```html
<script src="bower_components/mi-model/dist/mi-model.js"></script>
```

## Usage

```javascript
$.get( "json/EBI-9082861.json", function( data ) {

  new MIModel(data).load().then(function(model) {
    console.log("model", model);
  });
  
  // MIModel(data) returns a Backbone model structure representing the JAMI JSON.
  
  // Optionally you can chain the .load() function which returns
  // a Promise to fetch sequence lengths from uniprot.

});
```

## Model Relationships

![alt tag](https://rawgit.com/joshkh/model/master/img/mi-model-er-diagram.svg)
