"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _2 = require("./");

describe("Enum methods", function () {
  var countryCodeArray = [["AU", "Australia (+61)"], ["CA", "Canada (+1)"], ["CH", "Switzerland (+41)"], ["DE", "Germany (+49)"], ["FR", "France (+33)"], ["GB", "GB (+44)"], ["NL", "NL (+31)"], ["US", "US (+1)"]];

  var countryCodeObject = {
    AU: "Australia (+61)",
    CA: "Canada (+1)",
    CH: "Switzerland (+41)",
    DE: "Germany (+49)",
    FR: "France (+33)",
    GB: "GB (+44)",
    NL: "NL (+31)",
    US: "US (+1)"
  };

  var countryCodeEnumObject = {
    AU: 0,
    CA: 1,
    CH: 2,
    DE: 3,
    FR: 4,
    GB: 5,
    NL: 6,
    US: 7,
    0: "Australia (+61)",
    1: "Canada (+1)",
    2: "Switzerland (+41)",
    3: "Germany (+49)",
    4: "France (+33)",
    5: "GB (+44)",
    6: "NL (+31)",
    7: "US (+1)"
  };

  describe("Static methods", function () {
    test("`Enum.fromArray` constructs enum object correctly", function () {
      var e = _2.Enum.fromArray(countryCodeArray);
      expect(e).toMatchObject(countryCodeEnumObject);
    });

    test("`Enum.fromObject` constructs enum object correctly", function () {
      var e = _2.Enum.fromObject(countryCodeObject);
      expect(e).toMatchObject(countryCodeEnumObject);
    });
  });

  describe("Instance methods", function () {
    var CountryCodes = _2.Enum.fromArray(countryCodeArray);

    test("`Enum.prototype.keys`", function () {
      var keys = countryCodeArray.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return key;
      });
      expect(CountryCodes.keys()).toEqual(keys);
    });

    test("`Enum.prototype.entries`", function () {
      var entries = countryCodeArray.reduce(function (result, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        result[key] = value;
        return result;
      }, {});
      expect(CountryCodes.entries()).toEqual(entries);
    });

    test("`Enum.prototype.values`", function () {
      var values = countryCodeArray.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            _ = _ref6[0],
            value = _ref6[1];

        return value;
      });
      expect(CountryCodes.values()).toEqual(values);
    });

    test("`Enum.prototype.keyOf`", function () {
      expect(CountryCodes.keyOf("France (+33)")).toEqual("FR");
    });
  });

  describe("Common use-cases", function () {
    var CountryCodes = _2.Enum.fromObject(countryCodeObject);

    test("`Enum.prototype[Symbol.iterator]` works correctly for empty enum", function () {
      var Empty = void 0;
      try {
        Empty = new _2.Enum();
      } catch (e) {
        console.log(e);
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Empty[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          fail();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    test("`Enum.prototype[Symbol.iterator]` iterates over whole enum`", function () {
      var values = countryCodeArray.map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            _ = _ref8[0],
            value = _ref8[1];

        return value;
      });
      var result = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = CountryCodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var value = _step2.value;

          result.push(value);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      expect(result).toEqual(values);
    });

    test("`Enum` values can be used in `switch`", function () {
      var keys = CountryCodes.keys();
      var randomEnumValue = Math.round(Math.random() * keys.length);
      var key = void 0;

      switch (randomEnumValue) {
        case CountryCodes.AU:
          key = "AU";
          break;
        case CountryCodes.CA:
          key = "CA";
          break;
        case CountryCodes.CH:
          key = "CH";
          break;
        case CountryCodes.DE:
          key = "DE";
          break;
        case CountryCodes.FR:
          key = "FR";
          break;
        case CountryCodes.GB:
          key = "GB";
          break;
        case CountryCodes.NL:
          key = "NL";
          break;
        case CountryCodes.US:
          key = "US";
          break;
        default:
          fail();
      }

      expect(key).toEqual(CountryCodes.keyOf(CountryCodes[randomEnumValue]));
    });
  });
});