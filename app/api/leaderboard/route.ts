// app/api/leaderboard/route.ts

import { NextResponse } from "next/server";
import { getLeaderboardData } from "@/lib/data/mockStore";
// Removed requireAuth for public access

export async function GET() {
  try {
    const leaderboard = getLeaderboardData();
    return NextResponse.json(leaderboard);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load leaderboard" }, { status: 500 });
  }
}
