console.log("FILE >> routes/games/show.js");
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('game', params.game_id);
  },

  actions: {

    playGame: function(modelID) {
      this.transitionTo('games.play', modelID );
    }

  }

});
