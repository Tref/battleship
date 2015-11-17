console.log("===============> ROOT/frontend/routes/players/show.js");
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    // debugger;
    return this.store.find('player', params.player_id);
  }
});
