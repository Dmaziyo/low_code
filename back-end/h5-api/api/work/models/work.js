"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  beforeCreate: async (model, attrs, options) => {
    const defaultPages = [
      {
        elements: [],
      },
    ];
    model.set("pages", JSON.stringify(defaultPages));
  },
};
