console.log("FILE >> controllers/games/play.js");
import Ember from 'ember';

export default Ember.Controller.extend({

  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  selectRandomCells: function (argument) {
    var arr = [];
    while ( arr.length < 10 ) {
      var nA = [ this.getRandomInt(1, 6), this.getRandomInt(1, 6) ];
      if ( arr.containsNested(nA) ) {
        continue;
      }
       arr.push(nA);
    }
    return JSON.stringify(arr);
  },


  computerCoords: Ember.computed(function() {
    return this.selectRandomCells();
  }),

});
