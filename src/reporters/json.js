// @flow

import lo from 'lodash';

// json export reporter

const json = (data, path = '/') => {
  const tsMap = {
    object: (name, val) => json(val, `${path}${name}/`),
    added: (name, val) => {
      const ret = { name, path, action: 'add', value: val };
      return ret;
    },
    removed: (name) => {
      const ret = { name, path, action: 'remove' };
      return ret;
    },
    changed: (name, val) => {
      const ret = tsMap.added(name, val[0]);
      ret.action = 'change';
      ret.oldValue = val[1];
      return ret;
    },
    unchanged: () => '',
  };
  const flatData = lo.flatten(data);
  return flatData.map(row =>
    tsMap[row.type](row.name, row.val))
    .filter(x => x);
};

export default data => JSON.stringify(lo.flattenDeep(json(data)), null, '  ');
