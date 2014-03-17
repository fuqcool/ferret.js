ferret.module('core.event', function (require, exports, module) {
  var events = {};

  function listen(event, cb) {
    if (ferret.isString(event)) {
      if (events[event]) {
        events[event].push(cb);
      } else {
        events[event] = [cb];
      }
    } else {
      throw 'event should be a non-empty string: ' + event;
    }
  }

  function trigger(event) {
    if (ferret.isString(event)) {
      var args = Array.prototype.slice.call(arguments, 1);
      doTrigger(event, args);
    } else {
      throw 'event should be a non-empty string: ' + event;
    }
  }

  function doTrigger(name, args) {
    var callbacks = events[name];

    if (callbacks) {
      ferret.forEach(callbacks, function (cb) {
        cb.apply(null, args);
      });
    }
  }

  function clear() {
    events = {};
  }

  exports.listen = listen;
  exports.trigger = trigger;
  exports.clear = clear;
});
