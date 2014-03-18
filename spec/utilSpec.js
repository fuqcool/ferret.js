describe('util', function () {
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
      it('should be get type of ' + obj, function () {
        console.log(obj);
        expect(p(obj)).toBe(true);
      });
    };

    ptype(ferret.isNumber, 100);
    ptype(ferret.isNumber, NaN);

    ptype(ferret.isObject, { a: 'b' });
    ptype(ferret.isObject, [1, 2]);
    ptype(ferret.isObject, /foo/);
    ptype(ferret.isObject, new Date());
    ptype(ferret.isObject, function () {});

    ptype(ferret.isArray, [1, 2]);
    ptype(ferret.isDate, new Date());
    ptype(ferret.isFunction, function () {});
    ptype(ferret.isNaN, NaN);
    ptype(ferret.isBoolean, true);
    ptype(ferret.isBoolean, false);
    ptype(ferret.isString, 'foo');
    ptype(ferret.isNull, null);
    ptype(ferret.isUndefined, undefined);
    ptype(ferret.isRegExp, /foo/);
  });

  describe('type predicate', function () {
    var betype = function (obj, type) {
      it('should be type: ' + type, function () {
        expect(ferret.type(obj)).toBe(type);
      });
    };

    betype(100, 'number');
    betype(NaN, 'number');
    betype({ a: 'b' }, 'object');
    betype([1, 2], 'array');
    betype(new Date(), 'date');
    betype(function () {}, 'function');
    betype(true, 'boolean');
    betype(false, 'boolean');
    betype('foo', 'string');
    betype(null, 'null');
    betype(undefined, 'undefined');
    betype(/foo/, 'regexp');
    betype(new Error(), 'error');
  });

  describe('map', function () {
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

    it('should map an object', function () {
      var o = {
        a: 1,
        b: 2,
        c: 3
      };

      var result = ferret.map(o, function (v, k, obj) {
        expect(obj).toBe(o);
        expect(this).toBe(o);

        return v * v;
      }, o);

      expect(result).toEqual({
        a: 1,
        b: 4,
        c: 9
      });
      expect(o).toEqual({
        a: 1,
        b: 2,
        c: 3
      });
    });

  });

  describe('forEach', function () {
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

    it('should iterate an object', function () {
      var o = {
        a: 1,
        b: 2,
        c: 3
      };

      var result;
      result = ferret.forEach(o, function (v, i, obj) {
        o[i] = v * v;
        expect(obj).toBe(o);
        expect(this).toBe(o);
      }, o);

      expect(o).toEqual({
        a: 1,
        b: 4,
        c: 9
      });
      expect(result).toBe(undefined);
    });
  });

  it('should transform a array-like object into a real array', function () {
    var obj = {
      length: 2,
      0: 'a',
      1: 'b'
    };

    expect(ferret.toArray(obj)).toEqual(['a', 'b']);
  });

  describe('clone', function () {
    it('should clone an object', function () {
      var o = { a: 1, b: { c: 'foo' }, d: [2, 3], e: new Date(), f: function () {} };

      var dup = ferret.clone(o);
      expect(dup).not.toBe(o);
      expect(dup).toEqual(o);
    });

    it('should clone simple values', function () {
      expect(ferret.clone(100)).toBe(100);
      expect(ferret.clone(null)).toBe(null);
    });
  });

  describe('extend', function () {
    it('should extend an object', function () {
      var obj = {};
      var result = ferret.extend(obj, { a: 'b', c: 100 });

      expect(result).toBe(obj);
      expect(obj).toEqual({ a: 'b', c: 100 });
    });

    it('should be extended by more than one object', function () {
      var obj = {};
      var result = ferret.extend(
        obj,
        { a: 'b', c: 100 },
        { foo: 'bar', c: 0 }
      );

      expect(result).toBe(obj);
      expect(obj).toEqual({ a: 'b', c: 0, foo: 'bar' });
    });
  });

  describe('defaults', function () {
    it('should have default value', function () {
      var obj = { a: 'foo', c: null };
      var d = {
        a: 'hello',
        b: 100,
        c: 'bar'
      };

      var result = ferret.defaults(obj, d);

      expect(result).toBe(obj);
      expect(obj.a).toBe('foo');
      expect(obj.b).toBe(100);
      expect(obj.c).toBe('bar');
    });

    it('should have multiple defaults', function () {
      var obj = { a: 'foo', c: null };
      var d1 = {
        a: 'hello',
        b: 100
      };

      var d2 = {
        c: 'bar',
        b: 200
      };

      var result = ferret.defaults(obj, d1, d2);

      expect(result).toBe(obj);
      expect(obj.a).toBe('foo');
      expect(obj.b).toBe(100);
      expect(obj.c).toBe('bar');
    });
  });

  describe('bind', function () {
    it('should bind context to particular object', function () {
      var context = { a: 5, b: 10 };
      var fn = function (p1, p2) {
        expect(this).toBe(context);
        expect(p1).toBe('param1');
        expect(p2).toBe('param2');

        return this.a + this.b;
      };

      fn = ferret.bind(fn, context, 'param1');

      // will not change the context
      fn.call({}, 'param2');
    });
  });
});
