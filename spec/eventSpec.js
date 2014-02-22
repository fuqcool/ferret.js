describe('event', function () {
    afterEach(function () {
        ferret.use('core.event', function (event) {
            event.clear();
        });
    });

    it('should listen to an event', function () {
        var fooHandler = jasmine.createSpy('fooHandler');
        var barHandler = jasmine.createSpy('barHandler');

        ferret.use('core.event', function (event) {
            event.listen('changed', fooHandler);
            event.listen('changed', barHandler);

            event.trigger('changed', 1, 'hello');

            expect(fooHandler).toHaveBeenCalledWith(1, 'hello');
            expect(barHandler).toHaveBeenCalledWith(1, 'hello');
        });
    });

    it('should throw exception when trigger event name is not string', function () {
        ferret.use('core.event', function (event) {
            expect(function () {
                event.trigger({});
            }).toThrow();
        });
    });

    it('should throw exception when listen event name is not string', function () {
        ferret.use('core.event', function (event) {
            expect(function () {
                event.listen({});
            }).toThrow();
        });
    });
});
