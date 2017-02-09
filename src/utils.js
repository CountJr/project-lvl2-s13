// @flow

import fs from 'fs';
import path from 'path';

export const getExtention = fileName =>
  path.extname(fileName).replace('.', '');

export const readFile = filePath =>
  fs.readFileSync(filePath, 'utf-8');
