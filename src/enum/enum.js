class Enum {
  static from(array) {
    const e = {};

    array.forEach(({ key, value }, index) => {
      if (typeof e[key] !== "undefined") {
        throw new Error(`Duplicate key (key: "${key}")`);
      }

      e[key] = index;
      e[index] = value;
    });

    return Object.seal(Object.assign(Enum.prototype, e));
  }

  keys() {
    return Object.keys(this).filter(key => {
      const relativeInitialCharCode = key.charCodeAt(0) - 0x41;
      return relativeInitialCharCode >= 0 && relativeInitialCharCode <= 25;
    });
  }

  entries() {
    return this.keys().reduce((result, key) => {
      result[key] = this[this[key]];
      return result;
    }, {});
  }

  values() {
    return Object.entries(this)
      .filter(([key, value]) => key.charCodeAt(0) - 0x30 < 10)
      .map(([key, value]) => value);
  }

  keyOf(value) {
    return this.keys().find(key => this[this[key]] === value);
  }
}

export { Enum };
