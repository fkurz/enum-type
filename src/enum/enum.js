class Enum {
  static fromArray(array) {
    const e = {};

    array.forEach(([key, value], index) => {
      if (typeof e[key] !== "undefined") {
        throw new Error(`Duplicate key (key: "${key}")`);
      }

      e[key] = index;
      e[index] = value;
    });

    return Object.seal(Object.assign(new Enum(), e));
  }

  static fromObject(object) {
    return Enum.fromArray(Object.entries(object));
  }

  // TODO this guarantees order but is ugly
  keys() {
    return Object.keys(this)
      .filter(key => {
        const relativeInitialCharCode = key.charCodeAt(0) - 0x41;
        return relativeInitialCharCode >= 0 && relativeInitialCharCode <= 25;
      })
      .map(key => [this[key], key])
      .sort(([index_1, _], [index_2, __]) => index_1 - index_2)
      .map(([_, key]) => key);
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
