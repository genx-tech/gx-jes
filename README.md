

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


- [Builtin validation operators](#builtin-validation-operators)
  * [$eq, $eql, $equal](#eq-eql-equal)
  * [$ne, $neq, $notEqual](#ne-neq-notequal)
  * [$not](#not)
  * [$gt, $>, $greaterThan](#gt-greaterthan)
  * [$gte, $>=, $greaterThanOrEqual](#gte-greaterthanorequal)
  * [$lt, $<, $lessThan](#lt-lessthan)
  * [$lte, $<=, $lessThanOrEqual](#lte-lessthanorequal)
  * [$in](#in)
  * [$nin, $notIn](#nin-notin)
  * [$exist, $exists, $notNull](#exist-exists-notnull)
  * [$has, $match, $all](#has-match-all)
  * [$any, $or, $either](#any-or-either)
  * [$is, $typeOf](#is-typeof)
  * [$hasKey, $hasKeys, $withKey, $withKeys](#haskey-haskeys-withkey-withkeys)
  * [$startWith, $startsWith](#startwith-startswith)
  * [$endWith, $endsWith](#endwith-endswith)
  * [$eval, $apply](#eval-apply)
- [Builtin processing operators](#builtin-processing-operators)
  * [$size, $length, $count](#size-length-count)
  * [$sum, $total](#sum-total)
  * [$keys](#keys)
  * [$values](#values)
  * [$type](#type)
  * ['$add', '$plus', '$inc'](#add-plus-inc)
  * ['$sub', '$subtract', '$minus', '$dec'](#sub-subtract-minus-dec)
  * ['$mul', '$multiply', '$times'](#mul-multiply-times)
  * ['$div', '$divide'](#div-divide)
  * ['$set', '$=', '$value'](#set-value)
  * ['$addItem', '$override'](#additem-override)
  * [$pick](#pick)
  * [$omit](#omit)
  * ['$at', '$getByIndex', '$nth'](#at-getbyindex-nth)
  * ['$of', '$getByKey'](#of-getbykey)
  * ['$remap', '$mapKeys'](#remap-mapkeys)
  * ['$json', '$toJSON', '$stringify'](#json-tojson-stringify)
  * ['$object', '$parseJSON'](#object-parsejson)
- [License](#license)









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
let array = [1,2,3,4];
Result = JES.evaluate(array, '$size' );
//result: 4
```

```
let obj = { 'k1': 10, 'k2': 20 };
Result = JES.evaluate(obj, '$size' );
//result: 2
```

```
let str = 'abcd';
Result = JES.evaluate(str, '$size' );
//result: 4
```



### $sum, $total

Get the sum of array

```
let obj = {'key1':2000, 'key2':2000 };
Result = JES.evaluate(obj, '$sum' );
//result: 4000
```

```
let array = [2000, 1000];
Result = JES.evaluate(array, '$sum' );
//result: 3000
```


### $keys

Creates an array of the own enumerable property names of `object`.

``` 
let obj = { 'id': 1, 'user' : 2 };
Result = JES.evaluate(obj, '$keys' );
//result: ['id','user']
```

### $values

Creates an array of the own enumerable string keyed property values of `object`.

```
let obj = {'id' : 1,'user' : 2};
Result = JES.evaluate(obj, '$values' );
//result: [1,2]
```

### $type

Evlaute the type of input

```
let array = [1,2,3,4];
Result = JES.evaluate(array, '$type' );
//result: 'array'
```

### '$add', '$plus', '$inc'

Add

```
let obj = {'key1':2000}
Result = JES.evaluate(obj, {'$add': 1 });
//result: {'key1':2001}
```

### '$sub', '$subtract', '$minus', '$dec'

Substact

```
let obj = {'key1':2};
Result = JES.evaluate(obj, {'$sub': 1 });
//result: 1
```

### '$mul', '$multiply', '$times'

Multiply

```
let obj = {'key1':2000};
Result = JES.evaluate(obj, {'$mul': 2 });
//result: {'key1':4000}
```

### '$div', '$divide'

Divide

```
let obj = {'key1':2000};
Result = JES.evaluate(obj, { '$div': 2 });
//result: {'key1':1000}
```

### '$set', '$=', '$value'

Set value

```
let obj = {'a':1,'b':2};
Result = JES.evaluate(obj, { '$set': 'new' });
//result: 'new'
```

### '$addItem', '$override'

Add item

```
let obj = {'a':1,'b':2};
Result = JES.evaluate(obj, { '$addItem': ['c', '3'] });
//result: {'a':1,'b':2,'c':3}
```

### $pick

Creates an object composed of the `object` properties `predicate` returns truthy for. The predicate is invoked with two arguments: (value, key).

```
let obj = {'a':1, 'b':2, 'c':3  };
Result = JES.evaluate(obj,  { '$pick': { $not: [ 'b' ] } ) });
//result: {'a':1,'c':3}
```

```
let obj = {'a':1, 'b':2, 'c':3  };
Result = JES.evaluate(obj,  { '$pick': [ 'a', 'c' ] ) });
//result: {'a':1,'c':3}
```



### $omit

The opposite of `_.pick`; this method creates an object composed of the own and inherited enumerable property paths of `object` that are not omitted.

```
let obj = {a:1,b:2,c:3};
Result = JES.evaluate(obj, {'$omit': ['a']});
//result: {'b':2, 'c':3}
```

### '$at', '$getByIndex', '$nth'

Gets the element at index `n` of `array`. If `n` is negative, the nth element from the end is returned.

```
let array = [0,1,2,3,4,5];
Result = JES.evaluate(array, {'$at': 1});
//result: 1
Result = JES.evaluate(obj,  {'$at': -1});
//result: 5
```

### '$of', '$getByKey'

Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place.

```
obj = {'a':1, 'b':2, 'c':3 };
Result = JES.evaluate(obj, {'$of': 'a'} );
//result: 1
```

### '$remap', '$mapKeys'

remap the keys of an object

```
let obj = { 'id': 1, 'user':100, 'agency': 1 };
result = JES.evaluate(obj, {'$remap':{user:'username'}});
//result: {'id': 1, 'username':100, 'agency': 1}
```


```
let array = [{ 'id': 1, 'user':100, 'agency': 1 }];
result = JES.evaluate(array, {'|>$remap':{user:'username'}});
//result: [{'id': 1, 'username':100, 'agency': 1}]
```

### '$json', '$toJSON', '$stringify'

Stringify the value (from Object to JSON).

```
let obj = { 'x': 5, 'y': 6 };
result = JES.evaluate(obj, '$json');
//result: '{"x":5,"y":6}'
```

### '$object', '$parseJSON'

Parse the value into object (from JSON to Object).

```
let json = '{"result":true}';
result = JES.evaluate(json,'$object' );
//result: { 'result': true }
```


### '$toArray'

Parse the object into array.

```
let obj = {'user':100};
result = JES.evaluate({ obj , '$toArray'});
//result: [ {'user':100   }  ]
```






## License

MIT
