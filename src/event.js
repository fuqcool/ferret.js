blueos.module('core.event', function (exports, require, module) {
    var console = require('core.console');

    var events = {};

    function listen(event, cb) {
        if (blueos.isNonEmptyString(event)) {
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
        if (blueos.isNonEmptyString(event)) {
            var args = Array.prototype.slice.call(arguments, 1);
            doTrigger(event, args);
        } else {
            throw 'event should be a non-empty string: ' + event;
        }
    }

    function doTrigger(name, args) {
        var callbacks = events[name];

        if (callbacks) {
            blueos.forEach(callbacks, function (cb) {
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