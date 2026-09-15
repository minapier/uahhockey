import { NextRequest, NextResponse } from "next/server";
import { getDbConnection } from "../../../../lib/db";

import dotenv from "dotenv";
dotenv.config();

export const dynamic = "force-static";

interface RouteProps {
  params: Promise<{ season: string }>;
}

export async function GET(request: NextRequest, props: RouteProps) {
  // 1. Await the dynamic path parameters block
  const params = await props.params;
  const season = params.season;
  if (!season) {
    return NextResponse.json(
      { error: "Missing season parameter" },
      { status: 400 },
    );
  }
  console.log("season = ", season);
  try {
    // const fullPlayerResponse = {};
    const seasonResponse = {};
    const seasonResultsQuery =
      "SELECT game_id, game_date, CASE location WHEN 'A' THEN 'at' WHEN 'N' THEN 'vs.' ELSE '' END AS location, opponent, CASE conference WHEN 'Y' THEN '*' ELSE '' END AS conference, result, uah_score, opp_score, CASE overtime WHEN 1 THEN 'OT' WHEN NULL THEN '' WHEN 0 THEN '' ELSE CAST(overtime AS varchar) + 'OT' END AS ot, event, attendance FROM uahhockey_results WHERE (season = '" + season + "') ORDER BY game_date";
    const seasonRecordQuery =
      "SELECT COUNT(CASE WHEN result = 'W' THEN 1 END) AS wins, COUNT(CASE WHEN result = 'L' THEN 1 END) AS losses, COUNT(CASE WHEN result = 'T' THEN 1 END) AS ties FROM uahhockey_results WHERE (season = '" +
      season +
      "') AND (event IS NULL OR event <> 'Exhibition')";
    const seasonConfQuery =
      "SELECT COUNT(CASE WHEN result = 'W' THEN 1 END) AS wins, COUNT(CASE WHEN result = 'L' THEN 1 END) AS losses, COUNT(CASE WHEN result = 'T' THEN 1 END) AS ties FROM uahhockey_results WHERE (season = '" +
      season +
      "') AND (conference <> '')";
    const pool = await getDbConnection();
    const seasonResults = await pool.request().query(seasonResultsQuery);
    if (seasonResults) {
      seasonResponse["results"] = seasonResults.recordset;
    }
    const seasonRecord = await pool.request().query(seasonRecordQuery);
    if (seasonRecord) {
      seasonResponse["record"] = seasonRecord.recordset;
    }
    const seasonRecordConf = await pool.request().query(seasonConfQuery);
    if (seasonRecordConf) {
      seasonResponse["conf"] = seasonRecordConf.recordset;
    }

    return NextResponse.json(seasonResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}