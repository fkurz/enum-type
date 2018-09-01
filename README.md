# enum-type

A TypeScript inspired Enum type for plain JavaScript.

## INSTALLATION

```
npm i -S @fkurz/enum-type
```
## USAGE

```javascript
const Suit = Enum.fromObject({
  CLUB: "club",
  DIAMOND: "diamond",
  HEART: "heart",
  SPADE: "spade"
]);
```

See chapter _THE `Enum` CLASS_ below for more details.

## SUMMARY

### ENUMERATED TYPES

**Enumerated types** (or, **enumeration**/ **enum**) are most commonly implemented as a set of constants of a common type whose elements are bound to unique identifiers.

> ---

**EXAMPLE:** In Java an enum for the suits of (french) playing cards could be defined by

```java
enum CardSuit {
    CLUB,
    DIAMOND,
    HEART,
    SPADE
}
```

and is getting compiled to instances `CLUB`, `DIAMOND`, `HEART` and `SPADE` available as public static properties of CardSuit. Therefore

```java
CardSuit.class == CardSuit.CLUB.getClass() // true
```

> ---

This package provides a comparatively more flexible enum implementation for plain JavaScript which is inspired by [TypeScript enums][2]. 

The underlying concept is that an enum type simply is a

- finite collections of values $C$
- which can be enumerated by the natural numbers
- and defines unique names/symbols for each value

### TRANSLATION TO JAVASCRIPT

An enumerable type as specified above can be implemented in JavaScript as an `Object` with mixed `String` and `Number` keys where the number keys enumerate arbitrary values and the string keys give names to the index numbers—and implicitely to the values—for better readability.

> ---

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

> ---


### PROPERTIES OF THIS IMPLEMENTATION

This enum implementation has some convenient properties:

- Values may be of arbitrary and potentially heterogenous type
- Implicit ordering/comparability: e.g.
  ```javascript
  CardSuit.SPADE > CardSuit.CLUB; // true
  ```
- Value access by name (like an `Object`): e.g.
  ```javascript
  CardSuit[CardSuit.CLUB]; // 'club'
  ```
- Fixed iteration order (like an `Array`): e.g.

  ```javascript
  for (const suit of CardSuit) {
    console.log(suit);
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

> ---

**NOTE:** Retrieving values by name as shown in the second property requires two access operations on the enum: first to access the index for the given name and the second to retrieve the value for that index. E.g. we have to write

```
CardSuit[CardSuit.CLUB]
```

to obtain the value associated with the name `CLUB`.

**NOTE:** The compatibility with the _for-of_ loop shown (third implementation property) is due to `Enum`'s implementation of the `Iterable` interface (otherwise properties bound to string keys would also be looped over).

### THE `Enum` CLASS

#### Static methods

`Enum` provides two static constructors `.fromArray` and `.fromObject`.

<!-- prettier-ignore -->
* `Enum.fromArray(entries: Array<string[]>): Enum`

    Construct an `Enum` from an `Array` of `Arrays` containing the key at index zero and the value at index 1.
* `Enum.fromObject(object: { [key: string]: any }): Enum`
  
  Construct an `Enum` from an `Object`. This method simply recurs to `Enum.fromArray` by passing `Object.entries(object)`.

In addition to constructing it, both methods will make the enum instance unmodifiable using `Object.freeze`.

> ---

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

> ---

#### Instance methods

`Enum` provides the following instance methods:

<!-- prettier-ignore -->
- `.keys(): string[]`

  Return the key set as an `Array`.
- `.entries(): Array<string[]>`
  
  Return the entry set as an `Array` of `Array`s. The inner `Array`s have fixed length two where the first element stores the index and the second element stores the value. 
- `.values(): any[]`

  Return the value collection as an `Array`.
- `.keyOf(value: any): string`

  Return the key associated with the given value. This is the reverse of the value enumeration.

> ---

**EXAMPLES:**

```javascript
CardSuit.keys(); // ['CLUB', 'DIAMOND', 'HEART', 'SPADE']
CardSuit.entries(); // [['CLUB', 'card'], ['DIAMOND', 'diamond'], ['HEART', 'heart'], ['SPADE', 'spade']]
CardSuit.values(); // ['card', 'diamond', 'heart', 'spade']
CardSuit.keyOf("card"); // 'CARD'
```

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
[2]: https://www.typescriptlang.org/docs/handbook/enums.html#enums-at-runtime
