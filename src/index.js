// @flow

import fs from 'fs';
import path from 'path';
import lo from 'lodash';
import decode from './decoders';

// FIXIT: variable names
// TODO: fix this mess of code...

const makeTab = t => ' '.repeat(4 * t);
const parseObj = (obj, tab) => {
  const ret = typeof obj === 'object' ? `{\n${makeTab(tab + 1)}${JSON.stringify(obj, null, '    ').replace(/[{\n|}]/g, '')}\n${makeTab(tab + 1)}}` : obj;
  return ret;
};
const ts = (r, t = 0) => {
  const tsMap = {
    object: (name, val, tab) => `${makeTab(tab)}    ${name}: ${ts(val, tab + 1)}`,
    unchanged: (name, val, tab) => `${makeTab(tab)}    ${name}: ${parseObj(val, tab)}\n`,
    added: (name, val, tab) => `${makeTab(tab)}  + ${name}: ${parseObj(val, tab)}\n`,
    removed: (name, val, tab) => `${makeTab(tab)}  - ${name}: ${parseObj(val, tab)}\n`,
    changed: (name, val, tab) => `${makeTab(tab)}  + ${name}: ${val[1]}\n` +
                                `${makeTab(tab)}  - ${name}: ${val[0]}\n`,
  };
  const res = r.map(row =>
    tsMap[row.type](row.name, row.val, t),
  );
  return `{\n${res.join('')}${makeTab(t)}}\n`;
};

const parseData = (data1, data2) => {
  const keys = lo.uniq([...lo.keys(data1), ...lo.keys(data2)]);

  const result = keys.map((key) => {
    if (!lo.has(data1, key)) {
      return { name: key, type: 'added', val: lo.get(data2, key) };
    } else if (!lo.has(data2, key)) {
      return { name: key, type: 'removed', val: lo.get(data1, key) };
    } else if (typeof lo.get(data1, key) === 'object') {
      return { name: key, type: 'object', val: parseData(lo.get(data1, key), lo.get(data2, key)) };
    } else if (lo.get(data1, key) !== lo.get(data2, key)) {
      return { name: key, type: 'changed', val: [lo.get(data1, key), lo.get(data2, key)] };
    }
    return { name: key, type: 'unchanged', val: lo.get(data1, key) };
  });

  return result;
};

const compare = (d1, d2) => {
  const r1 = parseData(d1, d2);
  return ts(r1);
};

export default (firstFileName, secondFileName) => {
  const firstFileExt = path.extname(firstFileName).replace('.', '');
  const secondFileExt = path.extname(secondFileName).replace('.', '');

  const firstFileContents = fs.readFileSync(firstFileName, 'utf-8');
  const secondFileContents = fs.readFileSync(secondFileName, 'utf-8');

  const firstFileData = decode(firstFileExt)(firstFileContents);
  const secondFileData = decode(secondFileExt)(secondFileContents);

  return compare(firstFileData, secondFileData);
};
