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
    console.log("_METHOD_ >> play-board#init ");
  },

  didInsertElement: function (argument) {
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<");
    console.log("play-board > didInsertElement");
    console.log("board: ", this.board );
    if ( this.board === "human" ) {
      console.log("human positions: ", this.humanPositions );
    } else {
      // debugger;
      console.log("computer positions: ", this.computerPositions );
    };
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
  },

  actions: {

    selectCell: function (x, y) {
      console.log("cell selected: ", x, y );
    }

  }

});
