(function () {
    

    // module buffer
    var modules = {};

    // module init functions
    var moduleFns = {};

    // create a new module
    function module(name, cb) {
        if (!blueos.isString(name)) {
            console.error('module name should be a string:', name);
        }

        if (!blueos.isFunction(cb)) {
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

        if (blueos.isFunction(cb)) {
            cb(result);
        }

        return result;
    }

    function loadModule(name) {
        if (moduleFns[name]) {
            var m = { exports: {} };
            modules[name] = m;

            console.log('load module', name);
            moduleFns[name](m.exports, require, m);

            return modules[name].exports;
        }

        throw 'module does not exists: ' + name;
    }

    function removeModule(name, cacheOnly) {
        console.log('remove module', name);
        cacheOnly = (cacheOnly === 'cache' ? true : false);

        if (blueos.isString(name)) {
            delete modules[name];

            if (!cacheOnly) {
                delete moduleFns[name];
            }
        }
    };

    function use(mod, cb) {
        var list;
        if (blueos.isArray(mod)) {
            list = mod;
        } else if (blueos.isString(mod)) {
            list = [mod];
        } else {
            throw 'first parameter of `use` should be an array or string';
        }

        var result = [];
        blueos.forEach(list, function (name) {
            if (blueos.isNonEmptyString(name)) {
                result.push(require(name));
            }
        });

        if (blueos.isFunction(cb)) {
            cb.apply(blueos, result);
        }
    }

    var blueos = window.blueos = window.blueos || {};

    blueos.module = module;
    blueos.use = use;
    blueos.require = require;
    blueos.removeModule = removeModule;
}());
