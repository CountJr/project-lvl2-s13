// @flow

import lo from 'lodash';

// object style reporter

const makeTab = t => ' '.repeat(4 * t);
const parseObj = (obj, tab) => {
  const ret = typeof obj === 'object' ? `{\n${makeTab(tab + 1)}${JSON.stringify(obj, null, '    ').replace(/[{\n|"|}]/g, '')}\n${makeTab(tab + 1)}}` : obj;
  return ret;
};
const standart = (data, t = 0) => {
  const tsMap = {
    object: (name, val, tab) => `${makeTab(tab)}    ${name}: ${standart(val, tab + 1)}`,
    unchanged: (name, val, tab) => `${makeTab(tab)}    ${name}: ${parseObj(val, tab)}\n`,
    added: (name, val, tab) => `${makeTab(tab)}  + ${name}: ${parseObj(val, tab)}\n`,
    removed: (name, val, tab) => `${makeTab(tab)}  - ${name}: ${parseObj(val, tab)}\n`,
    changed: (name, val, tab) => `${makeTab(tab)}  + ${name}: ${val[1]}\n` +
                                `${makeTab(tab)}  - ${name}: ${val[0]}\n`,
  };
  const res = data.map(row =>
    tsMap[row.type](row.name, row.val, t),
  );
  return `{\n${res.join('')}${makeTab(t)}}\n`;
};

// plain style reporter

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
    tsMap[row.type](row.name, row.val)).join('');
};

const reporters = { plain, standart };

const report = format =>
  reporters[format];

export default report;
