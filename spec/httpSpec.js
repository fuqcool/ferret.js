describe('core.http', function () {
  it('should ', function () {
    ferret.use('core.http', function (http) {
      var onSuccess = jasmine.createSpy('success');
      var onError = jasmine.createSpy('error');

      spyOn($, 'ajax').andCallFake(function (options) {
        runs(function () {
          setTimeout(function () {
            options.success();
            options.error();
          }, 100);
        });
      });

      http({}).success(onSuccess).error(onError);

      waits(101);

      runs(function () {
        expect(onSuccess).toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
      });
    });
  });
});
