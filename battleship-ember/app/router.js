import Ember from 'ember';
import config from './config/environment';

console.log("===============> ROOT/frontend/router.js");

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("about");
  this.route('games', function() {
    this.route('new');
    this.route('show', { path: '/:game_id' });
  });
  this.route('players', function() {
    this.route('new');
    this.route('show', { path: '/:player_id' });
  });
});

export default Router;
