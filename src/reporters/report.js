// @flow

import standart from './standart';
import plain from './plain';
import json from './json';

const reporters = { plain, standart, json };

const report = format =>
  reporters[format];

export default report;
