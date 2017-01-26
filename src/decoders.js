// @flow

import YAML from 'js-yaml';

const iter = obj =>
  Object.keys(obj).reduce((acc, value) => {
    acc.push({ key: value, value: typeof obj[value] === 'object' ? iter(obj[value]) : obj[value] });
    return acc;
  }, []);

export const json = jsFile =>
  iter(JSON.parse(jsFile));

export const yaml = ymlFile =>
  iter(YAML.load(ymlFile));

const yml = yaml;

const decoders = { json, yml, yaml };

const decode = fileType =>
  decoders[fileType];

export default decode;
