console.log("FILE >> components/board-cell/component.js");
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'td',
  classNames: ['gameCell'],
  classNameBindings: ['selected:selectedCell:unselectedCell'],
  selected: false,

  selectedCells: [],

  numSelected: Ember.computed('selectedCells.@each.selected', function() {
    var currentlySelected = this.get('selectedCells');
    return currentlySelected.filterBy('selected', true).get('length');
  }),

  selectedCell: null,
  indexOfSelectedCell: Ember.computed('selectedCell', 'selectedCells.[]', function() {
    return this.get('selectedCells').indexOf(this.get('selectedCell'));
  }),

  click(el) {
    this.toggleProperty('selected');
    var _numSelected = this.get('numSelected');
    if (_numSelected === 10) {
      $('#myModal').modal( {show: true })
    };

  },

  didInsertElement() {
    this._super(...arguments);
    this.selectedCells.pushObject(this);
  }

});
