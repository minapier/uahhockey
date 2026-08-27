// YOUR_BASE_DIRECTORY/netlify/functions/api.ts
import express, { Router } from "express";
import serverless from "serverless-http";
import { NextResponse } from "next/server";
import { getDbConnection } from "../../../lib/db";

import dotenv from "dotenv";
dotenv.config();

const api = express();
const router = Router();
api.use(express.json());
api.use("/api/", router);

export const dynamic = "force-static";

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
    trustServerCertificate: Boolean(process.env.SQLSERVER_TRUSTCERT),
    port: Number(process.env.SQLSERVER_PORT),
  },
};


export async function GET() {
  try {
    const playersQuery =
      "SELECT player_id, last_name + ', ' + first_name AS player_name, CASE WHEN state IS NULL THEN hometown + ', ' + country ELSE hometown + ', ' + state END as player_hometown FROM uahhockey_players ORDER BY last_name, first_name";
    const pool = await getDbConnection();
    const result = await pool.request().query(playersQuery);
    return NextResponse.json(result.recordset, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}

export const handler = serverless(api);
