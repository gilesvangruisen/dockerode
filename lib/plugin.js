var util = require('./util');

/**
 * Represents a plugin
 * @param {Object} modem docker-modem
 * @param {String} name  Plugin's name
 */
var Plugin = function(modem, name) {
  this.modem = modem;
  this.name = name;
};

/**
 * Inspect
 * @param  {Function} callback Callback, if specified Docker will be queried.
 * @return {Object}            Name only if callback isn't specified.
 */
Plugin.prototype.inspect = function(callback) {
  if (typeof callback !== 'function') {
    return JSON.stringify({
      name: this.name
    });
  }

  var opts = {
    path: '/plugins/' + this.name,
    method: 'GET',
    statusCodes: {
      200: true,
      404: 'plugin is not installed',
      500: 'server error'
    }
  };

  this.modem.dial(opts, function(err, data) {
    callback(err, data);
  });
};

/**
 * Removes the plugin
 * @param  {[Object]}   opts     Remove options (optional)
 * @param  {Function} callback Callback
 */
Plugin.prototype.remove = function(opts, callback) {
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins/' + this.name,
    method: 'DELETE',
    statusCodes: {
      200: true,
      404: 'plugin is not installed',
      500: 'server error'
    },
    options: args.opts
  };

  this.modem.dial(optsf, function(err, data) {
    args.callback(err, data);
  });
};

/**
 * get privileges
 * @param  {Function} callback Callback
 * @return {Object}            Name only if callback isn't specified.
 */
Plugin.prototype.privileges = function(callback) {

  var opts = {
    path: '/plugins/privileges?',
    method: 'GET',
    options: {
      'name': this.name
    },
    statusCodes: {
      200: true,
      500: 'server error'
    }
  };

  this.modem.dial(opts, function(err, data) {
    callback(err, data);
  });
};


/**
 * Enable
 * @param  {Object}   opts     Plugin enable options (optional)
 * @param  {Function} callback Callback
 */
Plugin.prototype.enable = function(opts, callback) {
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins/' + this.name + '/enable',
    method: 'POST',
    statusCodes: {
      200: true,
      500: 'server error'
    },
    options: args.opts
  };

  this.modem.dial(optsf, function(err, data) {
    args.callback(err, data);
  });
};

/**
 * Disable
 * @param  {Object}   opts     Plugin disable options (optional)
 * @param  {Function} callback Callback
 */
Plugin.prototype.disable = function(opts, callback) {
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins/' + this.name + '/disable',
    method: 'POST',
    statusCodes: {
      200: true,
      500: 'server error'
    },
    options: args.opts
  };

  this.modem.dial(optsf, function(err, data) {
    args.callback(err, data);
  });
};

/**
 * Push
 * @param  {Object}   opts     Plugin push options (optional)
 * @param  {Function} callback Callback
 */
Plugin.prototype.push = function(opts, callback) {
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins/' + this.name + '/push',
    method: 'POST',
    statusCodes: {
      200: true,
      404: 'plugin not installed',
      500: 'server error'
    },
    options: args.opts
  };

  this.modem.dial(optsf, function(err, data) {
    args.callback(err, data);
  });
};

/**
 * COnfigure
 * @param  {Object}   opts     Plugin configure options (optional)
 * @param  {Function} callback Callback
 */
Plugin.prototype.configure = function(opts, callback) {
  var args = util.processArgs(opts, callback);

  var optsf = {
    path: '/plugins/' + this.name + '/set',
    method: 'POST',
    statusCodes: {
      200: true,
      404: 'plugin not installed',
      500: 'server error'
    },
    options: args.opts
  };

  this.modem.dial(optsf, function(err, data) {
    args.callback(err, data);
  });
};


module.exports = Plugin;
