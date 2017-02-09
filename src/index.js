// @flow

import fs from 'fs';
import path from 'path';
import lo from 'lodash';
import decode from './decoders';
import report from './reporters';

// TODO: fix variable names.
// TODO: make errors catching.


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

const getExtention = fileName =>
  path.extname(fileName).replace('.', '');

export const diffFromStrings = (
    firstFileContents,
    secondFileContents,
    firstFileExt,
    secondFileExt,
    format) => {
  const firstFileData = decode(firstFileExt)(firstFileContents);
  const secondFileData = decode(secondFileExt)(secondFileContents);

  const parsedData = parseData(firstFileData, secondFileData);

  return report(format)(parsedData);
};

export const diffFromFiles = (firstFileName, secondFileName, format = 'standart') => {
  const firstFileExt = getExtention(firstFileName);
  const secondFileExt = getExtention(secondFileName);

  const firstFileContents = fs.readFileSync(firstFileName, 'utf-8');
  const secondFileContents = fs.readFileSync(secondFileName, 'utf-8');

  return diffFromStrings(firstFileContents,
    secondFileContents, firstFileExt, secondFileExt, format);
};

export default diffFromStrings;
