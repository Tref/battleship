console.log("FILE >> components/play-cell/component.js");
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'td',
  classNames: ['gameCell', 'playCell'],
  classNameBindings: ['selected:selectedCell:unselectedCell', 'hit:hitCell:missedCell'],

  // Containers for human and computer ships
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

  getModelID: function() {
    let locArray = location.href.split("/");
    return locArray[locArray.length - 1];
  },

  // Get a random ship
  getRandomHumanShip: function () {
    var _humanShipsRemaining = this.get('humanShipsRemaining');
    var _numHumanShipsRemaining = _humanShipsRemaining.length;
    var _randomShipIndex = Math.floor(Math.random() * ( (_numHumanShipsRemaining ) - 0)) + 0;
    return _humanShipsRemaining.objectAt(_randomShipIndex);
  },

  // Setup each ship instance
  setupShips: function (isHumanBoard, cell) {
    this.coords = [cell.get('positionX'), cell.get('positionY') ];
    this.hit = false;
    this.selected = false;
    if ( isHumanBoard ) {
      var selectedHumanPositions = this._controller.get('humanPositions');
      if (selectedHumanPositions.containsNested(this.coords) ) {
        this.toggleProperty('target');
      }
      this.humanShips.pushObject(this);
    } else {
      var selectedComputerPositions = this._controller.get('computerPositions');
      if (selectedComputerPositions.containsNested(this.coords) ) {
        this.toggleProperty('target');
      }
      this.computerShips.pushObject(this);
    }
  },

  // 'Ship' component constructor
  init: function () {
    this._super(...arguments);
    this.isHumanBoard = this.board === "human";
    this.setupShips(this.isHumanBoard, this );
    
  },

  showLoading: function (argument) {
    var overlayDiv = $('<div class="loading-overlay"></div>');
    var text = $('<div class="loading-text">Computers Turn..</div>');
    var spinner = $('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
    overlayDiv.append(spinner).append(text);
    $('.playBoard:first .playTableContainer').append(overlayDiv);
    return overlayDiv;
    
  },

  // Attack function
  attack: function () {
    this.set('selected', true);

    
    if ( this.board === "human" ) { // if attacking the humans board

      // if this is a hit
      if ( this.target ) {
        this.set('hit', true);
        var _humanShipsHit = this.get('humanShipsHit');
        if (_humanShipsHit === 10) {
          $('#lostModal').modal('show');
          return false;
        }
      } else {
        this.set('miss', true);
      }
      // change turns
      this.turn = "human";
      return false;

    } else { // if attacking computers board

      // if this is a hit
      if ( this.target ) {
        this.set('hit', true);
        var _computerShipsHit = this.get('computerShipsHit');
        if (_computerShipsHit === 10) {

          $('#wonModal').modal('show');

          App.store.findRecord('game', this.getModelID() ).then(function(game) {
            game.set('completedOn', new Date() );
            game.save();
          });

          return false;
        }
      } else {
        this.set('miss', true);
      }
      // change turns
      this.turn = "computer";
      var randomShip = this.getRandomHumanShip();
      
      var self = this;
      self.loadingOverlay = this.showLoading();
      window.setTimeout( () => {
        self.attack.call(randomShip);
        self.loadingOverlay.remove();
      }, 800);

      
      return false;
    }
  },

  actions: {

    select: function() {
      this.turn = "human";
      this.attack();
    },

    completeGame: function (argument) {
      this.sendAction('completeGame');
    }

  } // actions

});