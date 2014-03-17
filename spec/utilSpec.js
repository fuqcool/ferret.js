describe('util', function () {
  it('should iterate an array', function () {
    var a = [1, 2, 3];
    var result;
    result = ferret.forEach(a, function (v, i, arr) {
      arr[i] = v * v;
      expect(arr).toBe(a);
      expect(this).toBe(a);
    }, a);

    expect(a).toEqual([1, 4, 9]);
    expect(result).toBe(undefined);
  });

  describe('alias', function () {
    var alias = function (f1, f2) {
      it('should has alias "' + f1 + '" -> "' + f2 + '"', function () {
        expect(ferret[f1]).toBe(ferret[f2]);
      });
    };

    alias('forEach', 'each');
  });

  describe('isXXX', function () {
    var ptype = function (p, obj) {
      it('should be type ' + ferret.type + ': ' + String.toString(obj), function () {
        expect(p(obj)).toBe(true);
      });
    };

    ptype(ferret.isNumber, 100);
    ptype(ferret.isObject, { a: 'b' });
    ptype(ferret.isArray, [1, 2]);
    ptype(ferret.isDate, new Date());
    ptype(ferret.isFunction, function () {});
    ptype(ferret.isNaN, NaN);
    ptype(ferret.isBoolean, true);
    ptype(ferret.isString, 'foo');
    ptype(ferret.isNull, null);
    ptype(ferret.isUndefined, undefined);
  });

  it('should map an array', function () {
    var a = [1, 2, 3];
    var result;

    result = ferret.map(a, function (v, i, arr) {
      expect(arr).toBe(a);
      expect(this).toBe(a);
      return v * v;
    }, a);

    expect(result).toEqual([1, 4, 9]);
    expect(a).toEqual([1, 2, 3]);
  });

  it('should transform a array-like object into a real array', function () {
    var obj = {
      length: 2,
      0: 'a',
      1: 'b'
    };

    expect(ferret.toArray(obj)).toEqual(['a', 'b']);
  });
});
