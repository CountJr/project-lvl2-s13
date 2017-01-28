// @flow

// json export reporter

const json = data =>
  JSON.stringify(data, null, '  ');

export default json;
