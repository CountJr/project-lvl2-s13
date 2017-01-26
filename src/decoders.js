// @flow

import YAML from 'js-yaml';
import INI from 'ini';

export const json = jsFile =>
  JSON.parse(jsFile);

export const yaml = ymlFile =>
  YAML.load(ymlFile);

const yml = yaml;

export const ini = iniFile =>
  INI.parse(iniFile);

const decoders = { json, yml, yaml, ini };

const decode = fileType =>
  decoders[fileType];

export default decode;
