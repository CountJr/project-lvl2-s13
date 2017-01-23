// @flow

import jsonDecode from '../src/decoders/jsonDecode';

const json = '{"one": "valone", "two": "valtwo", "three": {"four": "valfour", "five": "valfive"}}';

const result = [
  { key: 'one', value: 'valone' },
  { key: 'two', value: 'valtwo' },
  { key: 'three',
    value: [
    { key: 'four', value: 'valfour' },
    { key: 'five', value: 'valfive' },
    ] },
];

test('json decode test', () => {
  expect(jsonDecode(json)).toEqual(result);
});
