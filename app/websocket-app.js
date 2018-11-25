global.sockets = [];
class Connection extends require("websocket").server {
  constructor(args) {
    super(args);
  }

  init() {
    this.on("request", this.onRequest);
  }

  onRequest(request) {
    let connection = request.accept();

    connection.on("message", async function(message) {
      global.sockets.puch(connection);
    });
  }

  static send(data) {
    for (let con of global.sockets) {
      con.sendUTF(JSON.stringify(data));
    }
  }
}

module.exports = Connection;
