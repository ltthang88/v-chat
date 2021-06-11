"use strict";

const socketioJwt = require("socketio-jwt");

module.exports = function (io, opts) {
  io.sockets
    .on("connection", socketioJwt.authorize({
        secret: process.env.JWT_TOKEN_KEY,
        timeout: 15000, // 15 seconds to send the authentication message
      })
    )
    .on("autheticated", function (socket) {
      socket.on("entered", () => {
        let user = socket.decoded_token.user.name;
        let room = socket.decoded_token.room;

        opts.rooms.filter((r) => r.name === room)[0].users.push(user);
        socket.join(room);

        io.to(room).emit("user entered", user);
      });

      socket.on("message sent", (message) => {
        let user = socket.decoded_token.user.name;
        let room = socket.decoded_token.room;

        io.to(room).emit("message received", user, message)
      });

      socket.on("disconnect", () => {
        let user = socket.decoded_token.user.name;
        let room = socket.decoded_token.room;

        opts.rooms.filter( (r) => r.name == room)[0].users.splice(user, 1);

        io.to(room).emit("user exited", user);
      });

      let users = [];

      users.push({
        user: "test"
      })

      socket.emit("welcome", users);
    });
};
