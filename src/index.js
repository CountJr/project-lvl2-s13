// @flow

import fs from 'fs';
import path from 'path';
import decode from './decoders';

const makeMap = obj =>
  Object.keys(obj).reduce((acc, value) => acc.set(value, obj[value]), new Map());

const compare = (data1, data2) => {
  const data1Map = makeMap(data1);
  const data2Map = makeMap(data2);
  const keys = Array.from(new Set([...data1Map.keys(), ...data2Map.keys()]));
  const result = keys.map((value) => {
    if (!data2Map.has(value)) {
      return `  - ${value}: ${data1Map.get(value)}\n`;
    } else if (!data1Map.has(value)) {
      return `  + ${value}: ${data2Map.get(value)}\n`;
    } else if (data1Map.get(value) !== data2Map.get(value)) {
      return `  + ${value}: ${data2Map.get(value)}\n  - ${value}: ${data1Map.get(value)}\n`;
    }
    return `    ${value}: ${data1Map.get(value)}\n`;
  }).join('');
  return `{\n${result}}`;
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
