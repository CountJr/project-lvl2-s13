// @flow

import yamlP from 'js-yaml';
import iniP from 'ini';

export const json = jsFile =>
  JSON.parse(jsFile);

export const yaml = ymlFile =>
  yamlP.load(ymlFile);

const yml = yaml;

export const ini = iniFile =>
  iniP.parse(iniFile);

const decoders = { json, yml, yaml, ini };

const decode = fileType =>
  decoders[fileType];

export default decode;
