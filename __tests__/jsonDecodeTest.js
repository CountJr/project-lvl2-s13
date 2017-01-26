// @flow

import fs from 'fs';
import path from 'path';
import { json } from '../src/decoders';

const jsonFile = fs.readFileSync(path.join(__dirname, 'fixtures', 'testFile.json'), 'utf-8');

const result = [
  { key: 'one', value: 'valone' },
  { key: 'two', value: 'valtwo' },
  { key: 'three',
    value: [
    { key: 'four', value: 'valfour' },
    { key: 'five', value: 'valfive' },
    ] },
];

test('decode test | json', () => {
  expect(json(jsonFile)).toEqual(result);
});
