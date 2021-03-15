module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 != 0) {
    return false;
  }

  const params = {
    open: bracketsConfig.map(item => item[0]),
    close: bracketsConfig.map(item => item[1])
  };

  let counter = [];

  for (let i = 0; i < str.length; i++) {
    const opened = isBracketOpen(str[i], params),
      index = (opened) ? params.open.findIndex(item => item === str[i]) : params.close.findIndex(item => item === str[i]),
      lastCounter = counter[counter.length - 1];

    if (counter.length === 0 || str[i] != lastCounter[0] && opened) {
      counter.push([str[i], 1]);
      continue;
    }

    if (params.open[index] === params.close[index] && str[i] === lastCounter[0]) {
      if (lastCounter[1] === 1) {
        counter.pop(counter.length - 1);
        continue;
      }
    }

    if (!opened && lastCounter[0] === params.open[index]) {

      if (lastCounter[1] > 1) {
        lastCounter[1] -= 1;
        continue;
      }

      counter.pop(counter.length - 1);
      continue;
    }

    if (str[i] === lastCounter[0]) {
      lastCounter[1] += 1;
      continue;
    }
  }

  if (counter.length === 0) {
    return true;
  }

  return false;

  function isBracketOpen(element, config) {
    if (config.open.find(item => item === element) != undefined) {
      return true;
    }

    return false;
  }
}
