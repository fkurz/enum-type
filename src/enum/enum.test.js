import { Enum } from "./";

describe("Enum methods", () => {
  const countryCodeEnumArray = [
    { key: "AU", value: "Australia (+61)" },
    { key: "CA", value: "Canada (+1)" },
    { key: "CH", value: "Switzerland (+41)" },
    { key: "DE", value: "Germany (+49)" },
    { key: "FR", value: "France (+33)" },
    { key: "GB", value: "GB (+44)" },
    { key: "NL", value: "NL (+31)" },
    { key: "US", value: "US (+1)" }
  ];

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
    test("`Enum.from` constructs enum object", () => {
      const e = Enum.from(countryCodeEnumArray);
      expect(e).toMatchObject(countryCodeEnumObject);
    });
  });

  describe("Methods", () => {
    const e = Enum.from(countryCodeEnumArray);

    test("`Enum.prototype.keys`", () => {
      const keys = countryCodeEnumArray.map(({ key }) => key);
      expect(e.keys()).toEqual(keys);
    });

    test("`Enum.prototype.entries`", () => {
      const entries = countryCodeEnumArray.reduce((result, { key, value }) => {
        result[key] = value;
        return result;
      }, {});
      expect(e.entries()).toEqual(entries);
    });

    test("`Enum.prototype.values`", () => {
      const values = countryCodeEnumArray.map(({ value }) => value);
      expect(e.values()).toEqual(values);
    });

    test("`Enum.prototype.keyOf`", () => {
      expect(e.keyOf("France (+33)")).toEqual("FR");
    });
  });
});
