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
  // ACTIVATE PACK
  Tbltickets.activateTicket = function ({ Game, Pack, Nbr, Emp_id }, cb) {
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
        arg: "Ticket",
        type: {
          Game: "number",
          Pack: "number",
          Nbr: "number",
          Emp_id: "number",
        },
        required: "true",
        http: {
          source: "body",
        },
      },
    ],
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/activateTicket", verb: "post" },
  });

  // GET END DAY PREVIOUS DAY TICKETS
  Tbltickets.endDayPrevDayTickets = function (cb) {
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

  Tbltickets.remoteMethod("endDayPrevDayTickets", {
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/endDayPrevDayTickets", verb: "get" },
  });

  // GET GAME
  Tbltickets.game = function (game, cb) {
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

  Tbltickets.remoteMethod("game", {
    accepts: { arg: "game", type: "string", required: "true" },
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/game", verb: "get" },
  });

  // DELETE PACK
  Tbltickets.pack = function (Game, Pack, cb) {
    var sql = "CALL `deleteGamePack`(" + Game + "," + Pack + ");";
    dataSource.connector.execute(sql, function (err, data) {
      if (err) {
        console.log("Error:", err);
      }
      console.log("datum:", data);
      cb(null, data);
    });
  };

  Tbltickets.remoteMethod("pack", {
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
    ],
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/pack", verb: "delete" },
  });

  // SET END DAY TICKET
  Tbltickets.endDayTicket = function ({ Game, Pack, Nbr, Emp_id }, cb) {
    var sql =
      "CALL `endDayEmp`(" +
      Game +
      "," +
      Pack +
      ", " +
      Nbr +
      ", " +
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

  Tbltickets.remoteMethod("endDayTicket", {
    accepts: [
      {
        arg: "Ticket",
        type: {
          Game: "number",
          Pack: "number",
          Nbr: "number",
          Emp_id: "number",
        },
        required: "true",
        http: {
          source: "body",
        },
      },
    ],
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/endDayTicket", verb: "post" },
  });

  // SET START DAY TICKET
  Tbltickets.startDayTicket = function ({ Game, Pack, Nbr, Emp_id }, cb) {
    var sql =
      "CALL `startDayEmp`(" +
      Game +
      "," +
      Pack +
      ", " +
      Nbr +
      ", " +
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

  Tbltickets.remoteMethod("startDayTicket", {
    accepts: [
      {
        arg: "Ticket",
        type: {
          Game: "number",
          Pack: "number",
          Nbr: "number",
          Emp_id: "number",
        },
        required: "true",
        http: {
          source: "body",
        },
      },
    ],
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/startDayTicket", verb: "post" },
  });

  // GET SPARE PACKS BY GAME NAME
  Tbltickets.sparePacks = function (game, cb) {
    dataSource.connector.execute(
      "CALL `getSparePacksByGame`(" + game + ");",
      function (err, data) {
        if (err) {
          console.log("Error:", err);
        }
        console.log("datum:", data);
        cb(null, data);
      }
    );
  };

  Tbltickets.remoteMethod("sparePacks", {
    accepts: { arg: "game", type: "string", required: "true" },
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/sparePacks", verb: "get" },
  });

  // GET GAME PACK NBR RETURN EVERYTHING
  Tbltickets.groupTicket = function (Game, Pack, Nbr, cb) {
    var sql =
      "CALL `getGamePackNbrReturnEverything`(" +
      Game +
      "," +
      Pack +
      ", " +
      Nbr +
      ");";
    dataSource.connector.execute(sql, function (err, data) {
      if (err) {
        console.log("Error:", err);
      }
      console.log("datum:", data);
      cb(null, data);
    });
  };

  Tbltickets.remoteMethod("groupTicket", {
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
    ],
    returns: {
      arg: "result",
      type: "any",
      root: "true",
    },
    http: { path: "/groupTicket", verb: "get" },
  });

  // GET MONTHLY COUNTS
  Tbltickets.monthlyCounts = function (cb) {
    dataSource.connector.execute("CALL `monthlyCounts`();", function (
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

  Tbltickets.remoteMethod("monthlyCounts", {
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/monthlyCounts", verb: "get" },
  });

  // WEEKLY COUNTS
  Tbltickets.weeklyCounts = function (cb) {
    dataSource.connector.execute("CALL `weeklyCounts`();", function (
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

  Tbltickets.remoteMethod("weeklyCounts", {
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/weeklyCounts", verb: "get" },
  });

  // GET DAILY COUNTS PER GAME
  Tbltickets.dailyCounts = function (cb) {
    dataSource.connector.execute("CALL `dailyCounts`();", function (err, data) {
      if (err) {
        console.log("Error:", err);
      }
      console.log("datum:", data);
      cb(null, data);
    });
  };

  Tbltickets.remoteMethod("dailyCounts", {
    returns: {
      arg: "result",
      type: [{ SUM: "any", Game: "any" }],
      root: "true",
    },
    http: { path: "/dailyCounts", verb: "get" },
  });

  // SEED NEW GAME
  Tbltickets.seedNewGame = function (
    { Game, Pack, Nbr, Name, Price, Emp_id },
    cb
  ) {
    var sql =
      "CALL `seedNewGame`(" +
      Game +
      "," +
      Pack +
      "," +
      Nbr +
      ",'" +
      Name +
      "'," +
      Price +
      ",'" +
      Emp_id +
      "');";
    dataSource.connector.execute(sql, function (err, data) {
      if (err) {
        console.log("Error:", err);
      }
      console.log("datum:", data);
      cb(null, data);
    });
  };

  Tbltickets.remoteMethod("seedNewGame", {
    accepts: [
      {
        arg: "Ticket",
        type: {
          Game: "number",
          Pack: "number",
          Nbr: "number",
          Name: "string",
          Price: "number",
          Emp_id: "number",
        },
        required: "true",
        http: {
          source: "body",
        },
      },
    ],
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/seedNewGame", verb: "post" },
  });

  // SEED EXISTING GAME
  Tbltickets.seedExistingGame = function ({ Game, Pack, Nbr, Emp_id }, cb) {
    var sql =
      "CALL `seedExistingGame`(" +
      Game +
      "," +
      Pack +
      "," +
      Nbr +
      ",'" +
      Emp_id +
      "');";
    dataSource.connector.execute(sql, function (err, data) {
      if (err) {
        console.log("Error:", err);
      }
      console.log("datum:", data);
      cb(null, data);
    });
  };

  Tbltickets.remoteMethod("seedExistingGame", {
    accepts: [
      {
        arg: "Ticket",
        type: {
          Game: "number",
          Pack: "number",
          Nbr: "number",
          Emp_id: "number",
        },
        required: "true",
        http: {
          source: "body",
        },
      },
    ],
    returns: { arg: "result", type: "any", root: "true" },
    http: { path: "/seedExistingGame", verb: "post" },
  });

  // GET ALL GAMES
  Tbltickets.allGames = function (cb) {
    dataSource.connector.execute("CALL `getAllGameNamePrice`();", function (
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

  Tbltickets.remoteMethod("allGames", {
    returns: {
      arg: "result",
      type: "any",
      root: "true",
    },
    http: { path: "/allGames", verb: "get" },
  });
};
