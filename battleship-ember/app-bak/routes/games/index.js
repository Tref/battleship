console.log("===============> ROOT/frontend/routes/games/index.js");
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('game');
  }
});
