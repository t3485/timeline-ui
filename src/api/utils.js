export default {
  exists(array, item, cmp) {
    let data = cmp(item)
    for (let i = array.length - 1; i >= 0; i--) {
      if (cmp(array[i]) == data)
        break
    }
    return i != -1
  },
  find(array, item, opt) {
    let cmp, type = typeof opt;
    if (type == 'undefined') {
      cmp = x => x;
    } else if (type == 'function') {
      cmp = opt;
    }

    for (let i = array.length - 1; i >= 0; i--) {
      if (cmp(array[i]) == item)
        return i;
    }
    return -1;
  },
  union(target, source, opt) {
    let func, type = typeof opt;
    if (type == 'undefined') {
      func = x => x;
    } else if (type == 'function') {
      func = opt;
    }

    for (let i = 0; i < source.length; i++) {
      let j, data = func(source[i]);
      for (j = target.length - 1; j >= 0; j--) {
        if (func(target[j]) == data)
          break;
      }
      if (j == -1)
        target.push(source[i]);
    }
  },
  select(array, opt) {
    let data = [];

    let fun = opt;
    for (let i = 0; i < array.length; i++) {
      data.push(array[i])
    }
    return data;
  }
}
