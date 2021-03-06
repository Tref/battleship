console.log("FILE >> router.js");
import Ember from 'ember';
import config from './config/environment';



var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("about");
  this.route('games', function() {
    this.route('new');
    this.route('show', { path: '/:game_id' });
    this.route('play', { path: '/play/:game_id' });
  });
  this.route('players', {path: '/'}, function() {
    this.route('new');
    this.route('show', { path: '/:player_id' });
  });
});

export default Router;
