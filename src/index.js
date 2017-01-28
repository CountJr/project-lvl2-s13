// @flow

import fs from 'fs';
import path from 'path';
import lo from 'lodash';
import decode from './decoders';
import report from './reporters';

// TODO: fix this mess of code... fix variable names. and i don't like that pyramid of ifs.

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

export default (firstFileName, secondFileName, format = 'standart') => {
  const firstFileExt = path.extname(firstFileName).replace('.', '');
  const secondFileExt = path.extname(secondFileName).replace('.', '');

  const firstFileContents = fs.readFileSync(firstFileName, 'utf-8');
  const secondFileContents = fs.readFileSync(secondFileName, 'utf-8');

  const firstFileData = decode(firstFileExt)(firstFileContents);
  const secondFileData = decode(secondFileExt)(secondFileContents);

  const parsedData = parseData(firstFileData, secondFileData);

  return report(format)(parsedData);
};
