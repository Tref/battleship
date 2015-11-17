console.log("===============> ROOT/frontend/models/game.js");
import DS from 'ember-data';

export default DS.Model.extend({
  completedOn: DS.attr('date'),
  createdAt: DS.attr('date'),
  player: DS.belongsTo('player')
});