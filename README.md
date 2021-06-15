- [Builtin validation operators](#builtin-validation-operators)
  * [$eq, $eql, $equal](##eq---eql---equal)
  * [$ne, $neq, $notEqual](#-ne---neq---notequal)
  * [$not](#-not)
  * [$gt, $>, $greaterThan](#-gt-------greaterthan)
  * [$gte, $>=, $greaterThanOrEqual](#-gte--------greaterthanorequal)
  * [$lt, $<, $lessThan](#-lt-------lessthan)
  * [$lte, $<=, $lessThanOrEqual](#-lte--------lessthanorequal)
  * [$in](#-in)
  * [$nin, $notIn](#-nin---notin)
  * [$exist, $exists, $notNull](#-exist---exists---notnull)
  * [$has, $match, $all](#-has---match---all)
  * [$any, $or, $either](#-any---or---either)
  * [$is, $typeOf](#-is---typeof)
  * [$hasKey, $hasKeys, $withKey, $withKeys](#-haskey---haskeys---withkey---withkeys)
  * [$startWith, $startsWith](#-startwith---startswith)
  * [$endWith, $endsWith](#-endwith---endswith)
  * [$eval, $apply](#-eval---apply)
- [Builtin processing operators](#builtin-processing-operators)
  * [$size, $length, $count](#-size---length---count)
  * [$sum, $total](#-sum---total)
  * [$keys](#-keys)
  * [$values](#-values)
  * [$type](#-type)
  * ['$add', '$plus', '$inc'](#--add-----plus-----inc-)
  * ['$sub', '$subtract', '$minus', '$dec'](#--sub-----subtract-----minus-----dec-)
  * ['$mul', '$multiply', '$times'](#--mul-----multiply-----times-)
  * ['$div', '$divide'](#--div-----divide-)
  * ['$set', '$=', '$value'](#--set-----------value-)
  * ['$addItem', '$override'](#--additem-----override-)
  * [$pick](#-pick)
  * [$omit](#-omit)
  * ['$at', '$getByIndex', '$nth'](#--at-----getbyindex-----nth-)
  * ['$of', '$getByKey'](#--of-----getbykey-)
  * ['$remap', '$mapKeys'](#--remap-----mapkeys-)
  * ['$json', '$toJSON', '$stringify'](#--json-----tojson-----stringify-)
  * ['$object', '$parseJSON'](#--object-----parsejson-)
- [License](#license)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>





















































# @genx/jes

JSON Expression Syntax (JES)

## Installation

```sh
npm install @genx/jes
```

## Features

-   Validate a value with JSON Expression Syntax
-   Apply transformation to a value with JSON Expression Syntax

## Usage

```
const JES = require('@genx/jes');
let obj = {...};

const jeso = new JES(obj);

JES.match({
    //...JES validation schema
}); //returns [ {boolean} matched, {string} [reasonOfUnmatched] ]

jeso.match({
    //...JES validation schema
}); //returns jeso if matched or throw an exception

//immutable processing
jeso.evaluate({
    //...JES transforming schema
}); //returns the transformed result

//mutale processing
jeso.update({
    //...JES processing schema
}); //returns jeso with the internal value being transfromed
```

Sample validation schema

```
jeso.match({
    key1: { $gt: 0 } // The value of item with key "key1" should greater than 0
});
```

Sample processing schema

```
jeso.evaluate([
    { //stage1
        $select: { //select all items with field user >= 102
            user: {
                $gte: 102,
            },
        },
    },
    { //stage2
        '|>$omit': { //for each item, omit all fields starting with 'password', e.g. password, passwordSalt
            $startWith: 'password',
        },
    },
]);
```

## Builtin validation operators

### $eq, $eql, $equal

Deep equal comparison

```
const [ matched, unmatchedReason ] = JES.match(
    { key1: 100, key2: 'something', key3: [ 1, 2, 3 ] },
    { $eq: { key1: 100, key2: 'something', key3: [ 1, 2, 3 ] } });
//matched: true, unmatchedReason: undefined
```

### $ne, $neq, $notEqual

Deep non-equal comparison

```
const [ matched, unmatchedReason ] = JES.match(
    { key1: 100, key2: 'something' },
    { $neq: { key1: 100, key2: 'something', key3: [ 1, 2, 3 ] } });
//matched: true, unmatchedReason: undefined
```

### $not

Not

```
{ $not: { //validation schema } }
```

### $gt, $>, $greaterThan

Greater than

```
const [ matched, unmatchedReason ] = JES.match(
    1,
    { $gt: 0 });
//matched: true, unmatchedReason: undefined
```

### $gte, $>=, $greaterThanOrEqual

Greater than or Equal

```
const [ matched, unmatchedReason ] = JES.match(
    1,
    { $gte: 0 });
//matched: true, unmatchedReason: undefined
```

### $lt, $<, $lessThan

Less than

```
const [ matched, unmatchedReason ] = JES.match(
    1,
    { $lt: 2 });
//matched: true, unmatchedReason: undefined
```

### $lte, $<=, $lessThanOrEqual

Less than or equal

```
const [ matched, unmatchedReason ] = JES.match(
    1,
    { $lte: 2 });
//matched: true, unmatchedReason: undefined
```

### $in

Has object

```
const [ matched, unmatchedReason ] = JES.match(
    1,
    { $in: [0,1,2] });
//matched: true, unmatchedReason: undefined
```

### $nin, $notIn

Not has object

```
const [ matched, unmatchedReason ] = JES.match(
    1,
    { $in: [0,2,3] });
//matched: true, unmatchedReason: undefined
```

### $exist, $exists, $notNull

Not null

```
const [ matched, unmatchedReason ] = JES.match(
    { $exist: 1 });
//matched: true, unmatchedReason: undefined
```

### $has, $match, $all

Search a string for a match and return the first matched one

```
const [ matched, unmatchedReason ] = JES.match(
    "abcabcabc",
    { $has: "abc" });
//matched: "abc", unmatchedReason: undefined
```

### $any, $or, $either

Search a string for a match

```
const [ matched, unmatchedReason ] = JES.match(
    "abcabcabc",
    { $any: "abc" });
//matched: true, unmatchedReason: undefined
```

### $is, $typeOf

Check the value whether is certain type. Type can be one of integer, boolean, number, bigint, function, array, object, string(/text) and undefined

```
const [ matched, unmatchedReason ] = JES.match(
    100,
    { $is: 'integer' });
//matched: true, unmatchedReason: undefined
```

### $hasKey, $hasKeys, $withKey, $withKeys

Checks if `path` is a direct property of `object`

```
const [ matched, unmatchedReason ] = JES.match(
    {a:{b:10}},
    { $hasKey: a.b });
//matched: true, unmatchedReason: undefined
```

### $startWith, $startsWith

Start with

```
const [ matched, unmatchedReason ] = JES.match(
    "abcdefg",
    { $startWith: "a" });
//matched: true, unmatchedReason: undefined
```

### $endWith, $endsWith

End with

```
const [ matched, unmatchedReason ] = JES.match(
    "abcdefg",
    { $endWith: "g" });
//matched: true, unmatchedReason: undefined
```

### $eval, $apply

Apply processors pipeline to the value before validation.

```
JES.match(..., {
    $eval: [
        ['$keys', '$size'], //pipeline
        { //continue to validate the result of pipeline
            $neq: 4,
        },
    ],
});
```

## Builtin processing operators

### $size, $length, $count

Get the size of array

```
const [ matched, unmatchedReason ] = JES.evaluate(
    { $size: [1,2,3,4] });
//matched: 4, unmatchedReason: undefined
```

### $sum, $total

Get the sum of array

```
const [ matched, unmatchedReason ] = JES.evaluate(
    { $size: [1,2,3,4] });
//matched: 10, unmatchedReason: undefined
```

### $keys

Creates an array of the own enumerable property names of `object`.

```
function Foo(){
    this.a = 1;
    this.c = 2;
}
const [ matched, unmatchedReason ] = JES.evaluate(
    { $keys: new Foo });
//matched: ['a','c'], unmatchedReason: undefined

const [ matched, unmatchedReason ] = JES.evaluate(
    { $keys: "abcd" });
//matched: ['0','1','2','3'], unmatchedReason: undefined
```

### $values

Creates an array of the own enumerable string keyed property values of `object`.

```
function Foo(){
    this.a = 1;
    this.c = 2;
}
const [ matched, unmatchedReason ] = JES.evaluate(
    { $values: new Foo });
//matched: [1,2], unmatchedReason: undefined

const [ matched, unmatchedReason ] = JES.evaluate(
    { $values: "abcd" });
//matched: ['a','b','c','d'], unmatchedReason: undefined
```

### $type

Type of

```
const [ matched, unmatchedReason ] = JES.evaluate(
    { $type: [1,2,3,4] });
//matched: 'object', unmatchedReason: undefined
const [ matched, unmatchedReason ] = JES.evaluate(
    { $type: 1 });
//matched: 'number', unmatchedReason: undefined
```

### '$add', '$plus', '$inc'

Add

```
const [ matched, unmatchedReason ] = JES.evaluate(
    1,
    { $add: 1 });
//matched: 2, unmatchedReason: undefined
```

### '$sub', '$subtract', '$minus', '$dec'

Substact

```
const [ matched, unmatchedReason ] = JES.evaluate(
    2,
    { $sub: 1 });
//matched: 1, unmatchedReason: undefined
```

### '$mul', '$multiply', '$times'

Multiply

```
const [ matched, unmatchedReason ] = JES.evaluate(
    2,
    { $mul: 1 });
//matched: 2, unmatchedReason: undefined
```

### '$div', '$divide'

Divide

```
const [ matched, unmatchedReason ] = JES.evaluate(
    2,
    { $div: 1 });
//matched: 2, unmatchedReason: undefined
```

### '$set', '$=', '$value'

Set value

```
const [ matched, unmatchedReason ] = JES.evaluate(
    [1,2,3],
    { $set: 4 });
//matched: 4, unmatchedReason: undefined
```

### '$addItem', '$override'

Add item

```
const [ matched, unmatchedReason ] = JES.evaluate(
    [{'a':1,'b':2},{'a':3,'b':4}],
    { $addItem: ['c', '5'] });
//matched: [{'a':1,'b':2,'c':5},{'a':3,'b':4,'c':5}], unmatchedReason: undefined
```

### $pick

Creates an object composed of the `object` properties `predicate` returns truthy for. The predicate is invoked with two arguments: (value, key).

```
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && baseGetTag(value) == numberTag);
}
const [ matched, unmatchedReason ] = JES.evaluate(
    { $pick: ({'a':1,'b':'2','c':3},isNumber) });
//matched: {'a':1,'c':3}, unmatchedReason: undefined
```

### $omit

The opposite of `_.pick`; this method creates an object composed of the own and inherited enumerable property paths of `object` that are not omitted.

```
const [ matched, unmatchedReason ] = JES.evaluate(
    { $omit: ({'a':1,'b':'2','c':3},['a','c']) });
//matched: {'b':2}, unmatchedReason: undefined
```

### '$at', '$getByIndex', '$nth'

Gets the element at index `n` of `array`. If `n` is negative, the nth element from the end is returned.

```
const [ matched, unmatchedReason ] = JES.evaluate(
    { $at: ([0,1,2,3,4,5],1) });
//matched: 1, unmatchedReason: undefined
const [ matched, unmatchedReason ] = JES.evaluate(
    { $at: ([0,1,2,3,4,5],-1) });
//matched: 5, unmatchedReason: undefined
```

### '$of', '$getByKey'

Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place.

```
const [ matched, unmatchedReason ] = JES.evaluate(
    { $of: ({ 'a': [{ 'b': { 'c': 3 } }] },['a', '0', 'b', 'c']) });
//matched: 3, unmatchedReason: undefined
const [ matched, unmatchedReason ] = JES.evaluate(
    { $of: ({ 'a': [{ 'b': { 'c': 3 } }] },a.b.c,DEFAULT_VALUE) });
//matched: DEFAULT_VALUE, unmatchedReason: undefined
```

### '$remap', '$mapKeys'

remap the name of object

```
const [ matched, unmatchedReason ] = JES.evaluate(
    { x: 5, y: 6, z: 7 },
    { $remap: x: 'a' });
//matched: {a:5}, unmatchedReason: undefined
```

### '$json', '$toJSON', '$stringify'

Stringify the value (from Object to JSON).

```
const [ matched, unmatchedReason ] = JES.evaluate(
    { $json: { x: 5, y: 6 } });
//matched: '{'x':5,'y':6}', unmatchedReason: undefined
```

### '$object', '$parseJSON'

Parse the value into object (from JSON to Object).

```
const [ matched, unmatchedReason ] = JES.evaluate(
    { $object: '{'result':true, 'count':42}' });
//matched: { result: true, count: 42 }, unmatchedReason: undefined
```

## License

MIT
