// @flow

import fs from 'fs';
import path from 'path';
import decode from './decoders';
import report from './reporters';
import parseData from './parseData';


// TODO: fix variable names.
// TODO: make errors catching.

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
