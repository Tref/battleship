console.log("FILE >> routes/players/index.js");
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('player');
  }

});
