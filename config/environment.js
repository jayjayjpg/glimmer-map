'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'glimmer-map',
    environment: environment
  };

  if (environment === 'development') {
    ENV.MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
  }

  return ENV;
};
