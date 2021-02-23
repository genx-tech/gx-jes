# @genx/jes

JSON Expression Syntax (JES)

## Features

-   Validate a value with JSON Expression Syntax
-   Make transforming to a value with JSON Expression Syntax

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

```
const [ matched, unmatchedReason ] = JES.match(
    1,
    { $gt: 0 });
//matched: true, unmatchedReason: undefined
```

### $gte, $>=, $greaterThanOrEqual

```
const [ matched, unmatchedReason ] = JES.match(
    1,
    { $gte: 0 });
//matched: true, unmatchedReason: undefined
```

### $lt, $<, $lessThan

### $lte, $<=, $lessThanOrEqual

### $in

### $nin, $notIn

### $exist, $exists, $notNull

### $has, $match, $all

### $any, $or, $either

### $is, $typeOf

Check the value whether is certain type. Type can be one of integer, boolean, number, bigint, function, array, object, string(/text) and undefined

```
const [ matched, unmatchedReason ] = JES.match(
    100,
    { $is: 'integer' });
//matched: true, unmatchedReason: undefined
```

### $hasKey, $hasKeys, $withKey, $withKeys

### $startWith, $startsWith

### $endWith, $endsWith

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

### $sum, $total

### $keys

### $values

### $type

### '$add', '$plus', '$inc'

### '$sub', '$subtract', '$minus', '$dec'

### '$mul', '$multiply', '$times'

### '$div', '$divide'

### '$set', '$=', '$value'

### '$addItem', '$override'

### $pick

### $omit

### '$at', '$getByIndex', '$nth'

### '$of', '$getByKey'

## License

MIT
