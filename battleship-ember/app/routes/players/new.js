console.log("===============> ROOT/frontend/routes/players/new.js");
import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
      return {};
  },

  actions: {
    createPlayer: function (model) {
      let player = this.store.createRecord('player', {
        name: model.name,
      });
      
      var self = this;

      function transitionToGame(player) {
        var game = player.get('game'),
            _id = game.get('id');
        self.transitionTo('games.show', _id );
      }

      function failure(reason) {
        console.log("Failed: ", reason);
        // handle the error
      }

      player.save().then(transitionToGame).catch(failure);
    }
  }
});