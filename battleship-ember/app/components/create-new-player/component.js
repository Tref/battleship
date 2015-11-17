import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        createPlayer: function (model) {
            // console.log(newPlayer.name);
            this.sendAction('createPlayer', model);
        }
    }
});