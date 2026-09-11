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
      "SELECT season, COUNT(CASE WHEN result = 'W' THEN 1 END) AS wins, COUNT(CASE WHEN result = 'L' THEN 1 END) AS losses, COUNT(CASE WHEN result = 'T' THEN 1 END) AS ties FROM uahhockey_results GROUP BY season ORDER BY season";
    const pool = await getDbConnection();
    const result = await pool.request().query(playersQuery);
    return NextResponse.json(result.recordset, { status: 200 });
  } catch (error) {
    console.log("ERROR:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}

export const handler = serverless(api);
