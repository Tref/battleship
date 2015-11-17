console.log("===============> ROOT/frontend/controllers/players.js");
import Ember from 'ember';

export default Ember.Controller.extend({
  games: Ember.computed(function() {
    return this.store.findAll('game');
  }),

  filteredGames: Ember.computed('games.@each.isCompleted', function() {
    return this.get('games').filterBy('isCompleted');
  }),

  gameSort: ['duration:asc'],
  sortedGames: Ember.computed.sort('filteredGames', 'gameSort')
});
