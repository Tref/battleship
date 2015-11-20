console.log("FILE >> adapters/application.js");
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: 'http://localhost:3000'
});