console.log("===============> ROOT/frontend/models/player.js");
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  duration: DS.attr('number'),
  game: DS.belongsTo('game')
});