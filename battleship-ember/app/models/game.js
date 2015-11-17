console.log("===============> ROOT/frontend/models/game.js");
import DS from 'ember-data';

export default DS.Model.extend({
  completedOn: DS.attr('date'),
  createdAt: DS.attr('date'),
  duration: DS.attr('number'),
  readableDuration: DS.attr('string'),
  player: DS.belongsTo('player', { async: true }),

  isCompleted: Ember.computed('completedOn', function() {
    return  Ember.isPresent( this.get('completedOn') );
  })
});

