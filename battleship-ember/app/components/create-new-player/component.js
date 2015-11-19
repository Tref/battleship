import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        createPlayer: function (model) {
            console.log(model.name);
            this.sendAction('createPlayer', model);
        }
    }
});