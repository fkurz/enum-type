# js-enums

Enums for JavaScript

---

**INDEX:**

- [js-enums](#js-enums)
    - [Summary](#summary)
    - [Treatment of enumerable types](#treatment-of-enumerable-types)
    - [Translation to JavaScript](#translation-to-javascript)
        - [Properties of this implementation](#properties-of-this-implementation)
        - [The `Enum` class](#the-enum-class)
            - [Static methods](#static-methods)
            - [Instance methods](#instance-methods)

---

## Summary

This package provides the `Enum` class as common base for **enumerable types** in plain JavaScript.

## Treatment of enumerable types

The concept of an **enumerated type** (or, **enumeration**/ **enum**) has different interpretations in various languages. Most commonly, enums are thought of as sets of constants of a common type which are bound to associated identifiers.

---

**EXAMPLE:** In Java an enum for the suits of (french) playing cards could be defined by

```java
enum CardSuit {
    CLUB,
    DIAMOND,
    HEART,
    SPADE
}
```

This is getting compiled to instances `CLUB`, `DIAMOND`, `HEART` and `SPADE` available as public static properties of CardSuit. Therefore

```java
CardSuit.class == CardSuit.CLUB.getClass() // true
```

---

We lean towards a bit more flexible interpration of enums where an enumerable type is a specified as a

- finite collection of values $C$
- which can be enumerated by the natural numbers
- and whose indexes are associated with a set of names

This specification implies that $C$ is not necessarily a set and can contain values of arbitrary and not necessarily one and the same type. This is a comparatively weak approach in terms of type safety. However, on the plus side—by requiring enumerability over the natural numbers—we guarantee fixed iteration order and ordering/comparability. Moreover—by associating the indexes of the values with names—we get hash map like value access and mnemonics for the values which may improve readability and self-documentation properties of our code.

## Translation to JavaScript

An enumerable type as specified above can be implemented in JavaScript as an `Object` with mixed `String` and `Number` keys where the string keys map to the index of their associated valuesimplement the numbering the values to their order number and the string keys map names to order numbers.

---

**EXAMPLE:** The enumerable type for card suits could be defined as

```javascript
const CardSuit = {
  // value enumeration
  0: "club",
  1: "diamond",
  2: "heart",
  3: "spade",
  // name bindings
  CLUB: 0,
  DIAMOND: 1,
  HEART: 2,
  SPADE: 3
};
```

---

This is somewhat inspired by the way `enum` definitions are [transpiled in TypeScript][2]. We however discard the reverse mapping from indexes to keys in favor enumerating the values.

### Properties of this implementation

An enum implementation like that has some convenient properties:

- Implicit ordering :
  ```javascript
  Suit.SPADE > Suit.CLUB; // true
  ```
- Value access by name (like an `Object`):
  ```javascript
  CardSuit[CardSuit.CLUB]; // 'club'
  ```
- Fixed iteration order (like an `Array`):

  ```javascript
  for (let i = 0; i <= 3; i++) {
    console.log(CardSuit[i]);
  }

  // 'club'
  // 'diamond'
  // 'heart'
  // 'spade'
  ```

- Readability/self-documentation:
  ```javascript
  const colorOf(suit) {
      switch(suit) {
          case CardSuit.CLUB:
          case CardSuit.SPADE: return 'black';
          case CardSuit.DIAMOND:
          case CardSuit.HEART: return 'red';
          default:
              throw new Error('Unknown suit.');
      }
  }
  ```

---

**NOTE:** Retrieving values by name is a two-stage process. E.g. we have to write `CardSuit[CardSuit.CLUB]` to obtain the value associated with the name `CLUB`. This is because the enum stores index keys by name rather than the actual value.

### The `Enum` class

#### Static methods

`Enum` provides two static constructors `.fromArray` and `.fromObject`.

<!-- prettier-ignore -->
* `Enum.fromArray(entries: Array<string[]>): Enum`

    Construct an `Enum` from an `Array` of `Arrays` containing the key at index zero and the value at index 1.
* `Enum.fromObject(object: { [key: string]: any }): Enum`
  
  Construct an `Enum` from an `Object`. This method simply recurs to `Enum.fromArray` by passing `Object.entries(object)`.

In addition to constructing it, both methods will make the enum instance unmodifiable using `Object.freeze`.

---

**EXAMPLE:**

`CardSuit` can be constructed using the `Enum` class provided by this package as follows:

```javascript
const Suit = Enum.fromArray([
  ["CLUB", "club"],
  ["DIAMOND", "diamond"],
  ["HEART", "heart"],
  ["SPADE", "spade"]
]);
```

or—if the specific ordering is not relevant as long as there is some order—by

```javascript
const Suit = Enum.fromObject({
  CLUB: "club",
  DIAMOND: "diamond",
  HEART: "heart",
  SPADE: "spade"
]);
```

**NOTE:** The second enum does not necessarily return the values in insertion order of the passed object because the implementation uses `Object.entries` and this does not guarantee a fixed order. ([1])

---

#### Instance methods

`Enum` provides the following instance methods:

<!-- prettier-ignore -->
- `.keys(): string[]`
- 
  Return the key set as an `Array`.
- `.entries(): Array<string[]>`
  
  Return the entry set as an `Array` of `Array`s. The inner `Array`s have fixed length two the key being at index zero and the value being at index one. 
- `.values(): any[]`

  Return the value collection as an `Array`.
- `.keyOf(value: any): string`

  Return the key associated with the given value. This is the reverse of the value enumeration.

---

**EXAMPLES:**

```javascript
CardSuit.keys(); // ['CLUB', 'DIAMOND', 'HEART', 'SPADE']
CardSuit.entries(); // [['CLUB', 'card'], ['DIAMOND', 'diamond'], ['HEART', 'heart'], ['SPADE', 'spade']]
CardSuit.values(); // ['card', 'diamond', 'heart', 'spade']
CardSuit.keyOf("card"); // 'CARD'
```

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
[2]: https://www.typescriptlang.org/docs/handbook/enums.html#enums-at-runtime
