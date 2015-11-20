console.log("FILE >> components/play-cell/component.js");
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'td',
  classNames: ['gameCell', 'playCell'],

  humanShips: [],
  computerShips: [],

  humanShipsHit: Ember.computed('humanShips@each.hit', function() {
    var _humanShips = this.get('humanShips');
    return _humanShips.filterBy('hit', true).get('length');
  }),

  computerShipsHit: Ember.computed('computerShips@each.hit', function() {
    var _computerShips = this.get('computerShips');
    return _computerShips.filterBy('hit', true).get('length');
  }),

  humanShipsRemaining: Ember.computed('humanShips@each.selected', function() {
    var _humanShips = this.get('humanShips');
    return _humanShips.filterBy('selected', false);
  }),

  getRandomHumanShip: function () {
    var _humanShipsRemaining = this.get('humanShipsRemaining');
    var _numHumanShipsRemaining = _humanShipsRemaining.length;
    var _randomShipIndex = Math.floor(Math.random() * ( (_numHumanShipsRemaining ) - 0)) + 0;
    return _humanShipsRemaining.objectAt(_randomShipIndex);
    
  },

  setupShips: function (isHumanBoard, cell) {
    console.log("_METHOD_ >> play-cell#setupShips");

    this.coords = [cell.get('positionX'), cell.get('positionY') ];
    this.hit = false;
    this.selected = false;
    if ( isHumanBoard ) {

      var selectedHumanPositions = this._controller.get('humanPositions');
      if (selectedHumanPositions.containsNested(this.coords) ) {
        console.log("human target: ", this.coords);
        this.toggleProperty('target');
      }
      this.humanShips.pushObject(this);

    } else {

      var selectedComputerPositions = this._controller.get('computerPositions');
      if (selectedComputerPositions.containsNested(this.coords) ) {
        console.log("computer target: ", this.coords);
        this.toggleProperty('target');
      }
      this.computerShips.pushObject(this);

    }

  },

  init: function () {
    console.log("_METHOD_ >> play-cell#init");
    this._super(...arguments);
    this.isHumanBoard = this.board === "human";
    this.setupShips(this.isHumanBoard, this );
    
  },

  attack: function () {
    console.log("Attacking " + this.board + "'s Board at " + this.coords );
    // debugger;
    this.set('selected', true);

    if ( this.board === "human" ) {

      // debugger;

      if ( this.target ) {
        this.set('hit', true);
        var _humanShipsHit = this.get('humanShipsHit');
        console.log( _humanShipsHit + " human ships hit");
        if (_humanShipsHit == 10) {
          alert("Sorry, you lost!");
          return false;
        };
      } else {
        this.set('miss', true);
      }

      this.turn = "human";
      console.log(this.turn + "'s turn!"); 
    
      return false;

    } else {

      if ( this.target ) {
        this.set('hit', true);
        var _computerShipsHit = this.get('computerShipsHit');
        console.log( _computerShipsHit + " human ships hit");
        if (_computerShipsHit == 10) {
          alert("Yay, you won!");
          return false;
        };
      } else {
        this.set('miss', true);
      }

      this.turn = "computer";
      console.log(this.turn + "'s turn!");
      var randomShip = this.getRandomHumanShip();

      this.attack.call(randomShip);

      return false;

    }

  },

  actions: {

    select: function() {
      this.turn = "human";
      this.attack();
    }

  }

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