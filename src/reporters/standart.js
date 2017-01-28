// @flow

const makeTab = t => ' '.repeat(4 * t);
const parseObj = (obj, tab) => {
  const ret = typeof obj === 'object' ? `{\n${makeTab(tab + 1)}${JSON.stringify(obj, null, '    ').replace(/[{\n|"|}]/g, '')}\n${makeTab(tab + 1)}}` : obj;
  return ret;
};
const standart = (data, t = 0) => {
  const tsMap = {
    object: (name, val, tab) => `${makeTab(tab)}    ${name}: ${standart(val, tab + 1)}`,
    unchanged: (name, val, tab) => `${makeTab(tab)}    ${name}: ${parseObj(val, tab)}\n`,
    added: (name, val, tab) => `${makeTab(tab)}  + ${name}: ${parseObj(val, tab)}\n`,
    removed: (name, val, tab) => `${makeTab(tab)}  - ${name}: ${parseObj(val, tab)}\n`,
    changed: (name, val, tab) => `${makeTab(tab)}  + ${name}: ${val[1]}\n` +
                                `${makeTab(tab)}  - ${name}: ${val[0]}\n`,
  };
  const res = data.map(row =>
    tsMap[row.type](row.name, row.val, t),
  );
  return `{\n${res.join('')}${makeTab(t)}}\n`;
};

export default standart;
