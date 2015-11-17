console.log("===============> ROOT/frontend/app/controllers/games/new.js");
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createPlayer: function() {

      var player = this.store.createRecord('player', {
        name: this.get('name')
      });
      
      player.save();
      
      
      var game = this.store.createRecord('game', {
        player: this.get('player')
      });
      
      game.save();
      
      this.setProperties({
        name: ''
      });
      // this.transitionToRoute('/games/new');
    }
  }
});
