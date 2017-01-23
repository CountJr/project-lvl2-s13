// @flow

// import {  } from 'module';

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
  expect((json)).equalTo(result);
});
