(function () {
  var toString = function (obj) {
    return Object.prototype.toString.call(obj);
  };

  var typePredicate = function (expect) {
    return function (obj) {
      return toString(obj) === expect;
    };
  };

  var isArray = typePredicate('[object Array]');
  var isDate = typePredicate('[object Date]');

  var isFunction = function (f) {
    return typeof f === 'function';
  };

  var isObject = function (o) {
    return typeof o === 'object';
  };

  var isString = function (s) {
    return typeof s === 'string';
  };

  var isNonEmptyString = function (s) {
    return isString(s) && s.length;
  };

  var eachArray = function (a, cb) {
    var i;

    for (i = 0; i < a.length; i++) {
      cb(a[i], i, a);
    }
  };

  var eachObject = function (obj, cb) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        cb(obj[prop], prop, obj);
      }
    }
  };

  var forEach = function (obj, cb) {
    if (!isFunction(cb)) {
      console.warn('forEach invoked with no iterate function');
      return;
    }

    if (isArray(obj)) {
      if (isFunction(obj.forEach)) {
        obj.forEach(cb);
      } else {
        eachArray(obj, cb);
      }
    } else if (isObject(obj)) {
      eachObject(obj, cb);
    }
  };

  var noop = function () {};

  var clone = function (obj) {
    return $.extend({}, obj, true);
  };

  var ferret = window.ferret = window.ferret || {};

  ferret.isArray = isArray;
  ferret.isString = isString;
  ferret.isDate = isDate;
  ferret.isFunction = isFunction;
  ferret.isObject = isObject;
  ferret.isNonEmptyString = isNonEmptyString;
  ferret.forEach = forEach;
  ferret.noop = noop;
  ferret.clone = clone;
}());
