console.log("FILE >> components/play-board/component.js");
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["playBoard"],

  init: function (argument) {
    this._super(...arguments);
    if ( this.board === "human" ) {
      this.humanPositions = JSON.parse(this.coords);
    } else {
      this.computerPositions = JSON.parse(this.coords);
    }
  }

});
