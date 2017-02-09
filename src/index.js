// @flow

import { getExtention, readFile } from './utils';
import decode from './decoders';
import report from './reporters';
import parseData from './parseData';


// TODO: fix variable names.
// TODO: make errors catching.

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

  const firstFileContents = readFile(firstFileName);
  const secondFileContents = readFile(secondFileName);

  return diffFromStrings(firstFileContents,
    secondFileContents, firstFileExt, secondFileExt, format);
};

export default diffFromStrings;
