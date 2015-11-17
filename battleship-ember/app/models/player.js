console.log("===============> ROOT/frontend/models/player.js");
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  game: DS.belongsTo('game', { async: true }),

  // completedGames: Ember.computed.filter('games', function(game, index, array) {
  //   return !chore.done;
  // })

});