"use strict";

var DataSource = require("loopback-datasource-juggler").DataSource;
var dataSource = new DataSource({
  connector: require("loopback-connector-mysql"),
  host: "db431.cjeog1zo7yyf.us-east-2.rds.amazonaws.com",
  port: 3306,
  database: "SIS",
  user: "master431",
  password: "masterhot1",
});
module.exports = function (Tbltickets) {
  Tbltickets.activateTicket = function (Game, Pack, Nbr, Emp_id, cb) {
    var sql =
      "CALL `activatePack`(" +
      Game +
      "," +
      Pack +
      "," +
      Nbr +
      "," +
      Emp_id +
      ");";
    dataSource.connector.execute(sql, function (err, data) {
      if (err) {
        console.log("Error:", err);
      }
      console.log("datum:", data);
      cb(null, data);
    });
  };

  Tbltickets.remoteMethod("activateTicket", {
    accepts: [
      {
        arg: "Game",
        type: "string",
        required: "true",
      },
      {
        arg: "Pack",
        type: "string",
        required: "true",
      },
      {
        arg: "Nbr",
        type: "string",
        required: "true",
      },
      {
        arg: "Emp_id",
        type: "string",
        required: "true",
      },
    ],
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/activateTicket", verb: "post" },
  });

  Tbltickets.getEndDayPrevDayTickets = function (cb) {
    dataSource.connector.execute("CALL `getEndDayPrevDayTickets`();", function (
      err,
      data
    ) {
      if (err) {
        console.log("Error:", err);
      }
      console.log("datum:", data);
      cb(null, data);
    });
  };

  Tbltickets.remoteMethod("getEndDayPrevDayTickets", {
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/getEndDayPrevDayTickets", verb: "get" },
  });

  Tbltickets.getGame = function (game, cb) {
    dataSource.connector.execute("CALL `getGame`(" + game + ");", function (
      err,
      data
    ) {
      if (err) {
        console.log("Error:", err);
      }
      console.log("datum:", data);
      cb(null, data);
    });
  };

  Tbltickets.remoteMethod("getGame", {
    accepts: { arg: "game", type: "string", required: "true" },
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/getGame", verb: "get" },
  });
};
