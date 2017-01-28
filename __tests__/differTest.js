// @flow

import path from 'path';
import compare from '../';

// plain config tests

const firstFileJson = path.join(__dirname, 'fixtures', 'firstFile.json');
const firstFileYaml = path.join(__dirname, 'fixtures', 'firstFile.yml');
const firstFileIni = path.join(__dirname, 'fixtures', 'firstFile.ini');
const secondFile = path.join(__dirname, 'fixtures', 'secondFile.json');

const diffJson = compare(firstFileJson, secondFile);
const diffYaml = compare(firstFileYaml, secondFile);
const diffIni = compare(firstFileIni, secondFile);

const expectedResult = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}
`;

test('main | json compare', () =>
  expect(diffJson).toEqual(expectedResult));

test('main | yaml compare', () =>
  expect(diffYaml).toEqual(expectedResult));

test('main | ini compare', () =>
  expect(diffIni).toEqual(expectedResult));

// nested config tests

const firstNestedJson = path.join(__dirname, 'fixtures', 'firstNestedFile.json');
const secondNestedJson = path.join(__dirname, 'fixtures', 'secondNestedFile.json');

const firstNestedYml = path.join(__dirname, 'fixtures', 'firstNestedFile.yml');
const secondNestedYml = path.join(__dirname, 'fixtures', 'secondNestedFile.yml');

const firstNestedIni = path.join(__dirname, 'fixtures', 'firstNestedFile.ini');
const secondNestedIni = path.join(__dirname, 'fixtures', 'secondNestedFile.ini');

const expectedNested = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
`;

test('nested | json compare', () => {
  expect(compare(firstNestedJson, secondNestedJson)).toBe(expectedNested);
});

test('nested | yml compare', () => {
  expect(compare(firstNestedYml, secondNestedYml)).toBe(expectedNested);
});

test('nested | ini compare', () => {
  expect(compare(firstNestedIni, secondNestedIni)).toBe(expectedNested);
});

// plain output test

const expectedPlainResult = `Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value 'blah blah'
Property 'common.setting5' was added with complex value
Property 'group1.baz' was was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value
`;

test('plain output | json compare', () => {
  expect(compare(firstNestedJson, secondNestedJson, 'plain')).toBe(expectedPlainResult);
});

// TODO: json output test

// const expectedJsonResult = `{
// json
// }`;

// test('json output | json compare', () => {
//   expect(compare(firstNestedJson, secondNestedJson, 'json')).toBe(expectedJsonResult);
// });
