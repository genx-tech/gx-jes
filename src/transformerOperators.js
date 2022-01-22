//Query & aggregate operators (pure)
const OP_SIZE = 'Size Of';
const OP_SUM = 'Sum Of';
const OP_GET_TYPE = 'Type Of';
const OP_MATCH = 'Validate';
const OP_GET_BY_INDEX = 'Get Value By Index';
const OP_GET_BY_KEY = 'Get Value By Key';
const OP_IF = 'If Else';

//Type casting operators (pure)
const OP_CAST_ARRAY = 'Cast To Array';

//Math operators (pure)
const OP_ADD = 'Add';
const OP_SUB = 'Subtract';
const OP_MUL = 'Multiply';
const OP_DIV = 'Divide';
const OP_MOD = 'Remainder';

//Collection operators (pure)
const OP_KEYS = 'Keys Of';
const OP_VALUES = 'Values Of';
const OP_ENTRIES = 'Entries Of';
const OP_OBJ_TO_ARRAY = 'Object To Array'; // like $objectToArray of mongodb
const OP_PICK = 'Pick By'; // filter by key
const OP_OMIT = 'Omit By';
const OP_SLICE = 'Slice'; // limit offset, count
const OP_GROUP = 'Group By';
const OP_SORT = 'Order By';
const OP_REVERSE = 'Reverse';
const OP_JOIN = 'Join';
const OP_MERGE = 'Merge';
const OP_FILTER = 'Filter By'; // filter by value
const OP_REMAP = 'Map Keys'; // map a key to another name
const OP_TO_JSON = 'JSON Stringfy';
const OP_TO_OBJ = 'JSON Parse';

//Value updater (pure, copy on write)
const OP_SET = 'Set Value';
const OP_ADD_ITEM = 'Add K-V Entry';
const OP_ASSIGN = 'Assign';

//Colllection modifier
const OP_MAP = 'Map';
const OP_REDUCE = 'Reduce';

export default {
    OP_SIZE,
    OP_SUM,
    OP_GET_TYPE,
    OP_MATCH,
    OP_GET_BY_INDEX,
    OP_GET_BY_KEY,
    OP_IF,

    OP_CAST_ARRAY,

    OP_ADD,
    OP_SUB,
    OP_MUL,
    OP_DIV,
    OP_MOD,

    OP_KEYS,
    OP_VALUES,
    OP_ENTRIES,
    OP_OBJ_TO_ARRAY,
    OP_PICK, // filter by key
    OP_OMIT,
    OP_SLICE,
    OP_GROUP,
    OP_SORT,
    OP_REVERSE,
    OP_JOIN,
    OP_MERGE,
    OP_FILTER, // filter by value
    OP_REMAP, // map a key to another name
    OP_TO_JSON,
    OP_TO_OBJ,

    OP_SET,
    OP_ADD_ITEM,
    OP_ASSIGN,

    OP_MAP,
    OP_REDUCE,
};
