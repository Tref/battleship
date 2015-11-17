console.log("===============> ROOT/frontend/routes/games.js");
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    // debugger;
    return this.store.find('game', params.game_id);
  }
});
