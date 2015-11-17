import Ember from 'ember';

export default Ember.Component.extend({

  setupBoards: function() {
    // this.$().battleship();
    console.log("setup");
  }.on('didInsertElement')

});
