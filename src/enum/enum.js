class Enum {
  static fromArray(array) {
    const raw = {};
    const keys = [];

    array.forEach(([key, value], index) => {
      if (typeof raw[key] !== "undefined") {
        throw new Error(`Duplicate key (key: "${key}")`);
      }

      raw[key] = index;
      raw[index] = value;

      keys.push(key);
    });

    return Object.seal(Object.assign(new Enum(keys), raw));
  }

  static fromObject(object) {
    return Enum.fromArray(Object.entries(object));
  }

  constructor(keys) {
    this._keys = keys || [];
  }

  keys() {
    return [...this._keys];
  }

  entries() {
    return this.keys().reduce((result, key) => {
      result[key] = this[this[key]];
      return result;
    }, {});
  }

  values() {
    return this.keys().map(key => this[this[key]]);
  }

  keyOf(value) {
    return this.keys().find(key => this[this[key]] === value);
  }

  [Symbol.iterator]() {
    return {
      _elements: this.keys().map(key => [key, this[this[key]]]),
      _index: 0,
      next() {
        let value = null;
        let done = false;

        if (this._index === this._elements.length) {
          done = true;
        } else {
          value = this._elements[this._index];
          this._index = this._index + 1;
        }

        return { done, value };
      }
    };
  }
}

export { Enum };
