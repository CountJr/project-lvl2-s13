// @flow

// import {  } from 'module';

const inputFile = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
};

const outputFile = {
  host: 'hexlet.io',
  timeout: 20,
  verbose: true,
};

// statuses: unchanged, changed, new, deleted.
const resultOutput = [
  { key: 'host', status: 'unchanged', oldValue: 'hexlet.io', newValue: 'hexlet.io' },
  { key: 'timeout', status: 'changed', oldValue: '50', newValue: '20' },
  { key: 'proxy', status: 'deleted', oldValue: '123.234.53.22', newValue: '' },
  { key: 'verbose', status: 'new', oldValue: '', newValue: 'true' },
];

test('compare json files', () => {
  //expect(compare()).toEqual(resultOutput);
});
