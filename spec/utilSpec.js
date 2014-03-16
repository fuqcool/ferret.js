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
});
