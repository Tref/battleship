console.log("FILE >> components/create-new-player/component.js");
import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        createPlayer: function (model) {
            this.sendAction('createPlayer', model);
        }
    }
});