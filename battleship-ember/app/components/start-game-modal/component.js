console.log("/app/components/start-game-modal/component.js");
import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    startGame: function() {
      console.log("starting game 1");
      debugger;
      return this._controller.sendAction('startGame');
    }
  }
});