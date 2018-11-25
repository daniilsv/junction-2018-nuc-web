const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
global.wsdata = {};
global.ws = {};
class Reader {
  static parse(str_to_parse) {
    const raw_data = str_to_parse.split(" ");
    let d = global.wsdata[raw_data[0]];
    if (d === undefined) {
      global.wsdata[raw_data[0]] = {};
      d = global.wsdata[raw_data[0]];
    }
    let g = d[raw_data[1]];
    if (g === undefined) {
      d[raw_data[1]] = [];
      g = d[raw_data[1]];
    } 
    g.push(raw_data[2]);

    global.ws[raw_data[0]] = Reader.normalize(raw_data[2], raw_data[0]);
  }

  static mean(user) {
    let means_data = {};
    for (let param in global.wsdata[user]) {
      means_data[param] = average(global.wsdata[user][param]);
    }
    return means_data;
  }

  static max(user) {
    let max_data = {};
    for (let param in global.wsdata[user]) {
      max_data[param] = Math.max(global.wsdata[user][param]);
    }
    return max_data;
  }

  static min(user) {
    let min_data = {};
    for (let param in global.wsdata[user]) {
      min_data[param] = Math.min(global.wsdata[user][param]);
    }
    return min_data;
  }

  static normalize(x, user) {
    let data = {};
    data["color"] = 0;
    let max = Reader.max(user);
    let min = Reader.min(user);
    let mean = Reader.mean(user);
    for (let param in global.wsdata[user]) {
      data[param] =
        mean[param] > 50
          ? 100 - (50 * (max[param] - x)) / (max[param] - mean[param] + 1)
          : ((50 - min[param]) * x) / (mean[param] + 1) + min[param];
      if (Math.abs(x / mean[param]) > 0.2) data["color"] = 2;
    }
    return data;
  }
}

module.exports = Reader;
