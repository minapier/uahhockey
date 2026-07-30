// YOUR_BASE_DIRECTORY/netlify/functions/api.ts
import express, { Router } from "express";
import serverless from "serverless-http";
import { Connection, Request } from "tedious";
import dotenv from "dotenv";
dotenv.config();

const api = express();
const router = Router();
api.use(express.json());
api.use("/api/", router);

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
    trustServerCertificate: false,
    port: Number(process.env.SQLSERVER_PORT),
  },
};

router.get("/test", (req, res) => {
  return res.json({ message: "API is found." });
})

router.get("/players", async (req, res) => {
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




export const handler = serverless(api);

