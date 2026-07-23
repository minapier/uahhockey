import express, { Router } from "express";
import dotenv from "dotenv";
import { Connection, Request } from "tedious";
import serverless from "serverless-http";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.SERVER_PORT || 3000;
const SQL_PORT = parseInt(process.env.SQLSERVER_PORT, 10) || 1433;
console.log(process.env.SQLSERVER);

const sqlconfig = {
  server: process.env.SQLSERVER,
  authentication: {
    type: "default",
    options: {
      userName: process.env.SQLSERVER_USERNAME,
      password: process.env.SQLSERVER_PASSWORD,
    },
  },
  options: {
    database: process.env.SQLSERVER_DATABASE,
    encrypt: true,
    integratedSecurity: true,
    trustServerCertificate: true,
    port: SQL_PORT,
  },
};

// Get Players Data
app.get("/api/players", async (req, res) => {
  const connection = new Connection(sqlconfig);
  connection.on("connect", function (err) {
    if (err) {
      return res.status(500).json({ message: `${err}` });
    }
    const sqlQuery =
      "SELECT player_id, last_name + ', ' + first_name AS player_name, CASE WHEN state IS NULL THEN hometown + ', ' + country ELSE hometown + ', ' + state END as player_hometown FROM uahhockey_players";
    const sqlRequest = new Request(sqlQuery, (err, rowCount) => {
      if (err) {
        if (err) {
          res.status(500).json({ error: `${err}` });
        } else {
          connection.close();
        }
      }
    });

    let rows = [];
    sqlRequest.on("row", (columns) => {
      let row = {};
      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      });
      rows.push(row);
    });

    sqlRequest.on(
      "doneProc",
      (rowCount, more, returnStatus, outputParameters) => {
        res.json(rows); // Send the collected rows as JSON
      },
    );

    connection.execSql(sqlRequest);
  });
  connection.connect();
});

async function start() {
  app.listen(PORT, function () {
    console.log("Server is listening on port " + PORT);
  });
}

start();
export const handler = serverless(app);