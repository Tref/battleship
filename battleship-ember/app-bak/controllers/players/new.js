console.log("===============> ROOT/frontend/app/controllers/games/new.js");
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    startGame: function() {
      // var player = this.store.createRecord('player', {
      //   name: this.get('name')
      // });
      // player.save();
      // debugger;

      var game = this.store.createRecord('game', {
        // player: this.store.createRecord('player', { name: this.get('name') })
      });
      
      var self = this;

      function transitionToGame(game) {
        self.transitionToRoute('games.show', game);
      }

      function failure(reason) {
        // handle the error
      }

      game.save().then(transitionToGame).catch(failure);
      
    }
  }
});
