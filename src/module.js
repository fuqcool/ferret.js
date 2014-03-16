(function () {
  // module buffer
  var modules = {};

  // module init functions
  var moduleFns = {};

  // create a new module
  function module(name, cb) {
    if (!ferret.isString(name)) {
      console.error('module name should be a string:', name);
    }

    if (!ferret.isFunction(cb)) {
      console.error('module consructor should be a function:', name);
    }

    moduleFns[name] = cb;
  }

  // instantiate a module and return it
  function require(name, cb) {
    var result;

    if (modules[name]) {
      result = modules[name].exports;
    } else {
      result = loadModule(name);
    }

    if (ferret.isFunction(cb)) {
      cb(result);
    }

    return result;
  }

  function loadModule(name) {
    if (moduleFns[name]) {
      var m = { exports: {} };
      modules[name] = m;

      console.log('load module', name);
      moduleFns[name](require, m.exports, m);

      return modules[name].exports;
    }

    throw 'module does not exists: ' + name;
  }

  function removeModule(name, cacheOnly) {
    console.log('remove module', name);
    cacheOnly = (cacheOnly === 'cache' ? true : false);

    if (ferret.isString(name)) {
      delete modules[name];

      if (!cacheOnly) {
        delete moduleFns[name];
      }
    }
  }

  function use(mod, cb) {
    var list;
    if (ferret.isArray(mod)) {
      list = mod;
    } else if (ferret.isString(mod)) {
      list = [mod];
    } else {
      throw 'first parameter of `use` should be an array or string';
    }

    var result = [];
    ferret.forEach(list, function (name) {
      if (ferret.isNonEmptyString(name)) {
        result.push(require(name));
      }
    });

    if (ferret.isFunction(cb)) {
      cb.apply(ferret, result);
    }
  }

  var ferret = window.ferret = window.ferret || {};

  ferret.module = module;
  ferret.use = use;
  ferret.require = require;
  ferret.removeModule = removeModule;
}());
