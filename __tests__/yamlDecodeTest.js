// @flow

import fs from 'fs';
import path from 'path';
import { yaml } from '../src/decoders';

const jsonFile = fs.readFileSync(path.join(__dirname, 'fixtures', 'testFile.yml'), 'utf-8');

const result = [
  { key: 'one', value: 'valone' },
  { key: 'two', value: 'valtwo' },
  { key: 'three',
    value: [
    { key: 'four', value: 'valfour' },
    { key: 'five', value: 'valfive' },
    ] },
];

test('decode test | yaml', () => {
  expect(yaml(jsonFile)).toEqual(result);
});
