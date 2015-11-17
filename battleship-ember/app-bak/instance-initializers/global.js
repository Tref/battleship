// app/instance-initializers/global.js

export function initialize(application) {
  application.store = application.lookup("service:store");
  window.App = application;  // or window.Whatever
}

export default {
  name: 'global',
  initialize: initialize
};


// App.store.peekAll('game').objectAt(2).get('player').then(function(data) { alert(data.get('name')) })