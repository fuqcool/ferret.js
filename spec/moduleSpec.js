describe('module', function () {
    afterEach(function () {
        blueos.removeModule('m');
    });

    it('should be able to export properties', function () {
        blueos.module('m', function (exports, require, module) {
            exports.foo = 'bar';
        });

        blueos.use('m', function (m) {
            expect(m.foo).toBe('bar');
        });
    });

    it('should be able to replace exports object', function () {
        blueos.module('m', function (exports, require, module) {
            module.exports = 'bar';
        });

        blueos.use('m', function (m) {
            expect(m).toBe('bar');
        });
    });

    it('should raise error if module name is not string', function () {
        spyOn(console, 'error');

        blueos.module([], function () {});

        expect(console.error).toHaveBeenCalled();
    });

    it('should raise error if module constructor is not a function', function () {
        spyOn(console, 'error');

        blueos.module('m', {});

        expect(console.error).toHaveBeenCalled();
    });

    it('should throw error when require a non-existing module', function () {
        expect(function () {
            blueos.use('m');
        }).toThrow('module does not exists: m');
    });

    it('should lazy load module', function () {
        var foo = jasmine.createSpy('foo');
        blueos.module('m', foo);

        expect(foo).not.toHaveBeenCalled();

        blueos.use('m', function (m) {
            expect(foo).toHaveBeenCalled();
        });
    });

    it('should solve circular dependencies', function () {
        blueos.module('m1', function (exports, require, module) {
            var m2 = require('m2');

            exports.bar = function () {
                m2.foo();
            };
        });

        blueos.module('m2', function (exports, require, module) {
            require('m1');

            exports.foo = jasmine.createSpy('foo');
        });

        blueos.use(['m1', 'm2'], function (m1, m2) {
            m1.bar();
            expect(m2.foo).toHaveBeenCalled();
        });

        blueos.removeModule('m1');
        blueos.removeModule('m2');
    });

    it('should return cached module when require the second time', function () {
        blueos.module('m', function (exports) {
            exports.a = "b";
        });

        blueos.use('m', function (m1) {
            blueos.use('m', function (m2) {
                expect(m1).toBe(m2);
            });
        });
    });

    it('should remove module completely', function () {
        blueos.module('m', jasmine.createSpy('foo'));

        expect(function () {
            blueos.use('m');
        }).not.toThrow();

        blueos.removeModule('m');

        expect(function () {
            blueos.use('m');
        }).toThrow();
    });

    it('should remove module cache only', function () {
        blueos.module('m', jasmine.createSpy('foo'));

        expect(function () {
            blueos.use('m');
        }).not.toThrow();

        blueos.removeModule('m', 'cache');

        expect(function () {
            blueos.use('m');
        }).not.toThrow();
    });
});