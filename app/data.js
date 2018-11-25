const Stream = require("stream");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = class {
  constructor(id) {
    this.id = id;
    this.rnd = Math.random() * 5;
    this._s = new Stream();
  }
  stream() {
    this.running = true;
    this.mock();
    return this._s;
  }
  close() {
    this.running = false;
  }

  async mock() {
    const sensors = this._sendors();
    this.time = 0;
    while (this.running) {
      for (let s_name in sensors) {
        let s_value = sensors[s_name]();
        this._s.emit("data", this.id + " " + s_name + " " + s_value);
        this.time += 0.02;
      }
      console.log();
      await sleep(3000);
    }
  }
  _sendors() {
    return {
      light: () =>
        221 +
        (50 *
          (Math.sin(this.rnd * this.time) +
            Math.sin(2 * this.rnd * this.time))) /
          Math.sin(this.time),
      accel: () =>
        (30 *
          (Math.cos(this.rnd * this.time) +
            Math.sin(2 * this.rnd * this.time))) /
        Math.cos(this.time),
      proximity: () => 180 + Math.cos(this.rnd * this.time * 0.2) * 50,
      pulso: () =>
        80 +
        (Math.cos(this.rnd * this.time) + Math.sin(this.rnd * this.time)) /
          Math.sin(this.time),
      humidity: () =>
        28 +
        (Math.cos(this.rnd * this.time) + Math.sin(this.rnd * this.time)) /
          Math.sin(this.time) /
          5,
      temp: () =>
        27 +
        (Math.sin(this.rnd * this.time) + Math.sin(2 * this.rnd * this.time)) /
          Math.sin(this.time) /
          2
    };
  }
};
