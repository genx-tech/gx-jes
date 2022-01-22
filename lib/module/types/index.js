import _each from 'lodash/each';
import ARRAY from './array';
import BOOLEAN from './boolean';
import DATETIME from './datetime';
import INTEGER from './integer';
import NUMBER from './number';
import OBJECT from './object';
import TEXT from './text';
const types = {
  ARRAY,
  BOOLEAN,
  DATETIME,
  INTEGER,
  NUMBER,
  OBJECT,
  TEXT
};
const Types = { ...types,
  Builtin: new Set()
};

const addType = (name, type) => {
  if (Types.Builtin.has(type)) {
    throw new Error(`Type name or alias "${name}" has been used.`);
  }

  Types[name] = type;
  Types.Builtin.add(name);
};

_each(types, type => {
  addType(type.name, type);
  type.alias && type.alias.forEach(a => addType(a, type));
});

export default Types;
//# sourceMappingURL=index.js.map