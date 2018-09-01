"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Enum = function () {
  _createClass(Enum, null, [{
    key: "fromArray",
    value: function fromArray(array) {
      var raw = {};
      var keys = [];

      array.forEach(function (_ref, index) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (typeof raw[key] !== "undefined") {
          throw new Error("Duplicate key (key: \"" + key + "\")");
        }

        raw[key] = index;
        raw[index] = value;

        keys.push(key);
      });

      return Object.seal(Object.assign(new Enum(keys), raw));
    }
  }, {
    key: "fromObject",
    value: function fromObject(object) {
      return Enum.fromArray(Object.entries(object));
    }
  }]);

  function Enum(keys) {
    _classCallCheck(this, Enum);

    this._keys = keys || [];
  }

  _createClass(Enum, [{
    key: "keys",
    value: function keys() {
      return [].concat(_toConsumableArray(this._keys));
    }
  }, {
    key: "entries",
    value: function entries() {
      var _this = this;

      return this.keys().reduce(function (result, key) {
        result[key] = _this[_this[key]];
        return result;
      }, {});
    }
  }, {
    key: "values",
    value: function values() {
      var _this2 = this;

      return this.keys().map(function (key) {
        return _this2[_this2[key]];
      });
    }
  }, {
    key: "keyOf",
    value: function keyOf(value) {
      var _this3 = this;

      return this.keys().find(function (key) {
        return _this3[_this3[key]] === value;
      });
    }
  }, {
    key: Symbol.iterator,
    value: function value() {
      return {
        _values: this.values(),
        _index: 0,
        next: function next() {
          var value = null;
          var done = false;

          if (this._index === this._values.length) {
            done = true;
          } else {
            value = this._values[this._index];
            this._index = this._index + 1;
          }

          return { done: done, value: value };
        }
      };
    }
  }]);

  return Enum;
}();

exports.Enum = Enum;