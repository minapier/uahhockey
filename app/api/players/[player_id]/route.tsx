import express, { Router } from "express";
import serverless from "serverless-http";
import { NextRequest, NextResponse } from "next/server";
import { getDbConnection } from "../../../../lib/db";

import dotenv from "dotenv";
dotenv.config();

const api = express();
const router = Router();
api.use(express.json());
api.use("/api/", router);

export const dynamic = "force-static";

interface RouteProps {
  params: Promise<{ player_id: string }>;
}

export async function GET(request: NextRequest, props: RouteProps) {
  // 1. Await the dynamic path parameters block
  const params = await props.params;
  const playerId = params.player_id;
  if (!playerId) {
    return NextResponse.json(
      { error: "Missing player ID parameter" },
      { status: 400 },
    );
  }
  console.log("playerId = ", playerId);
  try {
    const fullPlayerResponse = {};
    const playerInfoQuery =
      "SELECT player_id, last_name + ', ' + first_name AS player_name, CASE WHEN state IS NULL THEN hometown + ', ' + country ELSE hometown + ', ' + state END as player_hometown FROM uahhockey_players WHERE player_id = " + playerId;
    const playerStatsQuery =
      "SELECT rec_id, player_id, season, position, year, games, goals, assists, goals + assists AS 'Points', ppg, shg, gwg, penalties, pim, wins, losses, ties, minutes, goals_against,  CASE WHEN minutes > 0 THEN CAST(CAST(goals_against AS float) * 60 / CAST(minutes AS float) AS DECIMAL(10 , 2)) ELSE 0.0 END AS 'GAA', saves, CASE WHEN saves + goals_against > 0 THEN CAST(CAST(saves AS float) / (CAST(saves AS float) + CAST(goals_against AS float)) AS DECIMAL(10 , 3)) ELSE 0.0 END AS 'svpct', shutouts FROM uahhockey_playerstats WHERE (player_id = " +
      playerId +
      ") ORDER BY season ASC";
    const pool = await getDbConnection();
    const infoResult = await pool.request().query(playerInfoQuery);
    if (infoResult) {
      fullPlayerResponse["info"] = infoResult.recordset;
    }
    const statsResult = await pool.request().query(playerStatsQuery);
    if (statsResult) {
      fullPlayerResponse["stats"] = statsResult.recordset;
    }
    return NextResponse.json(fullPlayerResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}

export const handler = serverless(api);
