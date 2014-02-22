ferret.module('core.http', function (exports, require, module) {
  function event(name, options) {
    return function (cb) {
      options[name] = cb;
      return chain(options);
    };
  }

  function chain(options) {
    return {
      success: event('success', options),
      error: event('error', options)
    };
  }

  function http(obj) {
    var options = ferret.clone(obj);

    $.ajax(options);

    return chain(options);
  }

  module.exports = http;
});
