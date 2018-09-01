import { Enum } from "./";

describe("Enum methods", () => {
  const countryCodeArray = [
    ["AU", "Australia (+61)"],
    ["CA", "Canada (+1)"],
    ["CH", "Switzerland (+41)"],
    ["DE", "Germany (+49)"],
    ["FR", "France (+33)"],
    ["GB", "GB (+44)"],
    ["NL", "NL (+31)"],
    ["US", "US (+1)"]
  ];

  const countryCodeObject = {
    AU: "Australia (+61)",
    CA: "Canada (+1)",
    CH: "Switzerland (+41)",
    DE: "Germany (+49)",
    FR: "France (+33)",
    GB: "GB (+44)",
    NL: "NL (+31)",
    US: "US (+1)"
  };

  const countryCodeEnumObject = {
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

  describe("Static methods", () => {
    test("`Enum.fromArray` constructs enum object correctly", () => {
      const e = Enum.fromArray(countryCodeArray);
      expect(e).toMatchObject(countryCodeEnumObject);
    });

    test("`Enum.fromObject` constructs enum object correctly", () => {
      const e = Enum.fromObject(countryCodeObject);
      expect(e).toMatchObject(countryCodeEnumObject);
    });
  });

  describe("Instance methods", () => {
    const CountryCodes = Enum.fromArray(countryCodeArray);

    test("`Enum.prototype.keys`", () => {
      const keys = countryCodeArray.map(([key, value]) => key);
      expect(CountryCodes.keys()).toEqual(keys);
    });

    test("`Enum.prototype.entries`", () => {
      const entries = countryCodeArray.reduce((result, [key, value]) => {
        result[key] = value;
        return result;
      }, {});
      expect(CountryCodes.entries()).toEqual(entries);
    });

    test("`Enum.prototype.values`", () => {
      const values = countryCodeArray.map(([_, value]) => value);
      expect(CountryCodes.values()).toEqual(values);
    });

    test("`Enum.prototype.keyOf`", () => {
      expect(CountryCodes.keyOf("France (+33)")).toEqual("FR");
    });
  });

  describe("Common use-cases", () => {
    const CountryCodes = Enum.fromObject(countryCodeObject);

    test("`Enum.prototype[Symbol.iterator]` works correctly for empty enum", () => {
      let Empty;
      try {
        Empty = new Enum();
      } catch (e) {
        console.log(e);
      }
      for (const element of Empty) {
        fail();
      }
    });

    test("`Enum.prototype[Symbol.iterator]` iterates over whole enum`", () => {
      const values = countryCodeArray.map(([_, value]) => value);
      const result = [];
      for (const value of CountryCodes) {
        result.push(value);
      }
      expect(result).toEqual(values);
    });

    test("`Enum` values can be used in `switch`", () => {
      const keys = CountryCodes.keys();
      const randomEnumValue = Math.round(Math.random() * keys.length);
      let key;

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
