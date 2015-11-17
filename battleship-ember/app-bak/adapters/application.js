console.log("===============> ROOT/frontend/adapters/application.js");
import DS from 'ember-data';
import ActiveModelAdapter from 'active-model-adapter';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: 'http://localhost:3000'
});

// export default ActiveModelAdapter.extend({
//   namespace: 'api',
//   host: 'http://localhost:3000'
// });

