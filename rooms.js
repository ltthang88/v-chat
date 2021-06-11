"use strict";

module.exports = function () {
  let rooms = [];

  rooms.push({
    name: "General",
    users: []
  });

  rooms.push({
    name: "Sports",
    users: []
  })

  rooms.push({
    name: "Music",
    users: []
  })

  return rooms;
}