console.log("===============> ROOT/frontend/routes/players/index.js");
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('player');
  }

});
