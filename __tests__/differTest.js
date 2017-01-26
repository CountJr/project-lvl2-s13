// @flow

import path from 'path';
import compare from '../';

const firstFileJson = path.join(__dirname, 'fixtures', 'firstFile.json');
const firstFileYaml = path.join(__dirname, 'fixtures', 'firstFile.yml');
const secondFile = path.join(__dirname, 'fixtures', 'secondFile.json');

const diffJson = compare(firstFileJson, secondFile);
const diffYaml = compare(firstFileYaml, secondFile);

const expectedResult = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('main | json compare', () =>
  expect(diffJson).toEqual(expectedResult));

test('main | yaml compare', () =>
  expect(diffYaml).toEqual(expectedResult));
