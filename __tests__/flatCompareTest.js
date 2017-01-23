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
  { key: 'host', parent: '', status: 'unchanged', oldValue: 'hexlet.io', newValue: 'hexlet.io' },
  { key: 'timeout', parent: '', status: 'changed', oldValue: '50', newValue: '20' },
  { key: 'proxy', parent: '', status: 'deleted', oldValue: '123.234.53.22', newValue: '' },
  { key: 'verbose', parent: '', status: 'new', oldValue: '', newValue: 'true' },
];

test('compare json files', () => {
  // expect(compare()).toEqual(resultOutput);
});
