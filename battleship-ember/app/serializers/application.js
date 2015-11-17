console.log("===============> ROOT/frontend/serializers/application.js");
import DS from 'ember-data';
// import { ActiveModelSerializer } from 'active-model-adapter';


export default DS.JSONAPISerializer.extend({

  serialize() {

    console.log("serializing");
    // debugger;
    const result = this._super(...arguments),
      attr = result.data.attributes,
      rel = result.data.relationships;

    return Object.keys(rel).reduce(function(acc, elem) {
      const data = rel[elem].data;
      if (data) {
        acc[elem + "_id"] = data.id;
      }
      if (data && data.type) {
        acc[elem + "_type"] = data.type[0].toUpperCase() + data.type.slice(1, -1);
      }
      return acc;

    }, attr);
 },

  keyForAttribute: function(attr, method) {
    // console.log("LOGGING ATTR ==============>>>>> ", attr);
    // console.log("LOGGING METHOD ==============>>>>> ", method);
    // console.log("LOGGING CHANGE ==============>>>>>", Ember.String.dasherize(attr).toUpperCase() );
    // console.log("--------------------\n");
    return Ember.String.decamelize(attr);
  }
});