describe('module', function () {
    afterEach(function () {
        ferret.removeModule('m');
    });

    it('should be able to export properties', function () {
        ferret.module('m', function (require, exports, module) {
            exports.foo = 'bar';
        });

        ferret.use('m', function (m) {
            expect(m.foo).toBe('bar');
        });
    });

    it('should be able to replace exports object', function () {
        ferret.module('m', function (require, exports, module) {
            module.exports = 'bar';
        });

        ferret.use('m', function (m) {
            expect(m).toBe('bar');
        });
    });

    it('should raise error if module name is not string', function () {
        spyOn(console, 'error');

        ferret.module([], function () {});

        expect(console.error).toHaveBeenCalled();
    });

    it('should raise error if module constructor is not a function', function () {
        spyOn(console, 'error');

        ferret.module('m', {});

        expect(console.error).toHaveBeenCalled();
    });

    it('should throw error when require a non-existing module', function () {
        expect(function () {
            ferret.use('m');
        }).toThrow('module does not exists: m');
    });

    it('should lazy load module', function () {
        var foo = jasmine.createSpy('foo');
        ferret.module('m', foo);

        expect(foo).not.toHaveBeenCalled();

        ferret.use('m', function (m) {
            expect(foo).toHaveBeenCalled();
        });
    });

    it('should solve circular dependencies', function () {
        ferret.module('m1', function (require, exports, module) {
            var m2 = require('m2');

            exports.bar = function () {
                m2.foo();
            };
        });

        ferret.module('m2', function (require, exports, module) {
            require('m1');

            exports.foo = jasmine.createSpy('foo');
        });

        ferret.use(['m1', 'm2'], function (m1, m2) {
            m1.bar();
            expect(m2.foo).toHaveBeenCalled();
        });

        ferret.removeModule('m1');
        ferret.removeModule('m2');
    });

    it('should return cached module when require the second time', function () {
        ferret.module('m', function (require, exports) {
            exports.a = "b";
        });

        ferret.use('m', function (m1) {
            ferret.use('m', function (m2) {
                expect(m1).toBe(m2);
            });
        });
    });

    it('should remove module completely', function () {
        ferret.module('m', jasmine.createSpy('foo'));

        expect(function () {
            ferret.use('m');
        }).not.toThrow();

        ferret.removeModule('m');

        expect(function () {
            ferret.use('m');
        }).toThrow();
    });

    it('should remove module cache only', function () {
        ferret.module('m', jasmine.createSpy('foo'));

        expect(function () {
            ferret.use('m');
        }).not.toThrow();

        ferret.removeModule('m', 'cache');

        expect(function () {
            ferret.use('m');
        }).not.toThrow();
    });
});
