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
  ferret.isNumber = isNumber;
  ferret.isNonEmptyString = isNonEmptyString;
  ferret.type = type;

  ferret.forEach = forEach;
  ferret.noop = noop;
  ferret.clone = clone;
}());
