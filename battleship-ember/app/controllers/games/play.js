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


  // computerCoords: "[ [1,1], [1,2], [1,3], [1,4], [1,5], [2,1], [2,2], [2,3], [2,4], [2,5] ]",

  // humanCoords: function() {
  //   // console.log("humanCoords");
  //   // return "abc";
  //   // var game = this.model;
  //   // return game.positions;
  // },

  // generateRandomPositions: function (argument) {
  //   console.log("generateRandomPositions");
  //   var _randomPositions = "[ [1,1], [1,2], [1,3], [1,4], [1,5], [2,1], [2,2], [2,3], [2,4], [2,5] ]";
  //   return _randomPositions;
  // },

  // computerCoords: function() {
  //   console.log("computerCoords");
  //   return this.generateRandomPositions();
  // }

});



// Warn if overriding existing method
if(Array.prototype.equals) {
  console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array) {
      return false;
    }

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// Warn if overriding existing method
if(Array.prototype.containsNested)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.containsNested = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    for (var i = this.length - 1; i >= 0; i--) {
      var nestedArray = this[i];
      if ( nestedArray.equals(array) ) {
        return true
      }
    };
    return false;
 
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "containsNested", {enumerable: false});