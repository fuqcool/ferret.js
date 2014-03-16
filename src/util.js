(function () {
  var type = function (o) {
    if (o === null) {
      return 'null';
    } else if (o === undefined) {
      return 'undefined';
    } else if (typeof o === 'object') {
      return _type(o);
    } else {
      return typeof o;
    }

    function _type(o) {
      var typeStr = Object.prototype.toString.apply(o);
      return typeStr.slice(8, -1).toLowerCase();
    }
  };

  var isType = function (expect) {
    return function (obj) {
      return type(obj) === expect;
    };
  };


  var isArray = isType('array');
  var isDate = isType('date');
  var isFunction = isType('function');
  var isObject = isType('object');
  var isString = isType('string');
  var isNumber = isType('number');

  var isNonEmptyString = function (s) {
    return isString(s) && s.length;
  };

  var eachArray = function (a, cb, context) {
    if (Array.prototype.forEach) {
      a.forEach(cb, context);
    } else {
      for (var i = 0; i < a.length; i++) {
        cb.call(context, a[i], i, a);
      }
    }
  };

  var eachObject = function (obj, cb, context) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        cb.call(context, obj[prop], prop, obj);
      }
    }
  };

  var map = function (obj, cb, context) {
    var result;

    if (isArray(obj)) {
      result = [];
    } else if (isObject(obj)) {
      result = {};
    }

    if (isFunction(cb)) {
      forEach(obj, function (value, key) {
        result[key] = cb.call(context, value, key, obj);
      });
    }

    return result;
  };

  var forEach = function (obj, cb, context) {
    if (isArray(obj)) {
      eachArray(obj, cb, context);
    } else if (isObject(obj)) {
      eachObject(obj, cb, context);
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
  ferret.isNumber = isNumber;
  ferret.isNonEmptyString = isNonEmptyString;
  ferret.type = type;

  ferret.forEach = forEach;
  ferret.map = map;
  ferret.noop = noop;
  ferret.clone = clone;
}());
