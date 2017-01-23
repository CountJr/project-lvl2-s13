// @flow

export default (jsFile: string): Array => {
  const iter = (obj) => {
    return Object.keys(obj).reduce((acc, value) => {
      acc.push({ key: value, value: typeof obj[value] === 'object' ? iter(obj[value]) : obj[value] })
      return acc;
    }, []);
  };
  return iter(JSON.parse(jsFile));
};
