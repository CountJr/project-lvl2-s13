// @flow

import lo from 'lodash';

const parseData = (data1, data2) => {
  const parseMap = {
    added: {
      pattern: (a, b, key) => !lo.has(a, key),
      ret: (a, b, key) => ({ name: key, type: 'added', val: lo.get(b, key) }) },
    removed: {
      pattern: (a, b, key) => !lo.has(b, key),
      ret: (a, b, key) => ({ name: key, type: 'removed', val: lo.get(a, key) }) },
    object: {
      pattern: (a, b, key) => typeof lo.get(a, key) === 'object',
      ret: (a, b, key) => ({ name: key, type: 'object', val: parseData(lo.get(a, key), lo.get(b, key)) }) },
    changed: {
      pattern: (a, b, key) => lo.get(a, key) !== lo.get(b, key),
      ret: (a, b, key) => ({ name: key, type: 'changed', val: [lo.get(a, key), lo.get(b, key)] }) },
    unchanged: {
      pattern: () => true,
      ret: (a, b, key) => ({ name: key, type: 'unchanged', val: lo.get(a, key) }) },
  };

  const getDataType = (a, b, key) =>
    Object.keys(parseMap).filter(type =>
      parseMap[type].pattern(a, b, key),
    )[0];

  const keys = lo.union(Object.keys(data1), Object.keys(data2));
  return keys.reduce((acc, key) => [...acc,
    parseMap[getDataType(data1, data2, key)].ret(data1, data2, key)],
    []);
};

export default parseData;
