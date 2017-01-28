// @flow

import lo from 'lodash';

const makeStringValue = (str) => {
  const ret = typeof str === 'string' ? `'${str}'` : `${str}`;
  return ret;
};
const makeComplexValue = (obj) => {
  const ret = typeof obj === 'object' ? 'complex value' : `value ${makeStringValue(obj)}`;
  return ret;
};

const plain = (data, path = '') => {
  const tsMap = {
    object: (name, val) => plain(val, `${name}.`),
    added: (name, val) => `Property '${path}${name}' was added with ${makeComplexValue(val)}\n`,
    removed: name => `Property '${path}${name}' was removed\n`,
    changed: (name, val) => `Property '${path}${name}' was was updated. From '${val[0]}' to '${val[1]}'\n`,
    unchanged: () => '',
  };
  const flatData = lo.flatten(data);
  return flatData.map(row =>
    tsMap[row.type](row.name, row.val))
    .join('');
};

export default plain;
