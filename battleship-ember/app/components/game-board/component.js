import Ember from 'ember';
import BoardCell from 'battleship-ember/components/board-cell/component';


export default Ember.Component.extend({
  classNames: ['boardContainer'],

  selectedCoords: function() {

    var _selectedCells = App.lookup('component:board-cell').selectedCells.filterBy('selected', true);
    var _selectedCoords = [];

    _selectedCells.forEach( function(item, index, enumerable){
      var _coords = []
      _coords[0] = item.get('positionX');
      _coords[1] = item.get('positionY');
      _selectedCoords[index] = _coords;
    });

    return _selectedCoords;
  },

  getModelID: function() {
    let locArray = location.href.split("/");
    return locArray[locArray.length - 1];
  },

  updateGameWithPositions: function (selected) {

    App.store.findRecord('game', this.getModelID() ).then(function(game) {
      game.set('positions', JSON.stringify(selected) );
      game.save();
    });

  },

  actions: {
    startGame: function() {
      var selected = this.selectedCoords();
      this.updateGameWithPositions( selected );
      this.get('controller').sendAction('playGame', this.getModelID()  );
    }
  }

  
});
