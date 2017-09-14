const Property = require('./Property');

module.exports = Property.extend({

  defaults: Object.assign({}, Property.prototype.defaults, {
    // 'background' is a good example where to make a difference
    // between detached and not
    //
    // - NOT detached (default)
    // background: url(..) no-repeat center ...;
    // - Detached
    // background-image: url();
    // background-repeat: repeat;
    // ...
    detached: 0,

    // Array of sub properties
    properties: [],
  }),

  getDefaultValue() {
    let value = this.get('defaults');

    if (value) {
      return value;
    }

    value = '';
    const properties = this.get('properties');
    properties.each((prop, index) => value += `${prop.getDefaultValue()} `);
    return value.trim();
  },

  getFullValue() {
    if (this.get('detached')) {
      return '';
    }

    let result = '';
    this.get('properties').each(prop => result += `${prop.getFullValue()} `);
    return result.trim();
  },

});
