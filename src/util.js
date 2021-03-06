﻿(function () {
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
  var isObject = function (o) {
    return o !== null && (typeof o === 'object' || typeof o === 'function');
  };
  var isString = isType('string');
  var isNumber = isType('number');
  var isRegExp = isType('regexp');
  var isNull = isType('null');
  var isUndefined = isType('undefined');
  var isBoolean = isType('boolean');
  var isNaN = function (n) {
    // NaN is a number but not equal to itself.
    return isNumber(n) && n !== n;
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
    if (!isArray(obj) && !isObject(obj)) {
      console.log(obj);
      return obj;
    }

    return map(obj, function (v, k) {
      return v;
    });
  };

  var extend = function (dest) {
    var srcs = toArray(arguments).slice(1);

    forEach(srcs, function (src) {
      forEach(src, function (v, k) {
        dest[k] = v;
      });
    });

    return dest;
  };

  var defaults = function (obj) {
    var params = toArray(arguments).slice(1);

    forEach(params, function (param) {
      forEach(param, function (v, k) {
        if (obj[k] == null) {
          obj[k] = v;
        }
      });
    });

    return obj;
  };

  var toArray = function (obj) {
    return Array.prototype.slice.call(obj);
  };


  var bind = function (fn, context) {
    var args = toArray(arguments).slice(2);

    return function () {
      fn.apply(context, args.concat(toArray(arguments)));
    };
  };

  var ferret = window.ferret = window.ferret || {};

  ferret.type = type;
  ferret.isArray = isArray;
  ferret.isString = isString;
  ferret.isDate = isDate;
  ferret.isFunction = isFunction;
  ferret.isObject = isObject;
  ferret.isNumber = isNumber;
  ferret.isRegExp = isRegExp;
  ferret.isUndefined = isUndefined;
  ferret.isNull = isNull;
  ferret.isBoolean = isBoolean;
  ferret.isNaN = isNaN;

  ferret.forEach = ferret.each = forEach;
  ferret.toArray = toArray;
  ferret.map = map;
  ferret.noop = noop;
  ferret.clone = clone;
  ferret.extend = extend;
  ferret.defaults = defaults;
  ferret.bind = bind;
}());
