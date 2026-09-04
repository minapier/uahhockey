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
