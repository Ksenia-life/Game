"use strict";

require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.to-string.js");
var characters = [{
  name: 'мечник',
  health: 10
}, {
  name: 'маг',
  health: 100
}, {
  name: 'маг',
  health: 0
}, {
  name: 'лучник',
  health: 0
}];
characters.filter(function (item) {
  return item.health > 0;
});