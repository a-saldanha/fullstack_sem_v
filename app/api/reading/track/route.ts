// app/api/reading/track/route.ts (New simplified route)

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session"; 
import { updatePagesRead } from "@/lib/data/mockStore";

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(); 
    const body = await request.json();
    const pagesRead = parseInt(body.pagesRead);

    if (isNaN(pagesRead) || pagesRead <= 0) {
        return NextResponse.json({ error: "Invalid pages count provided." }, { status: 400 });
    }

    const updatedUser = updatePagesRead(session.user.id, pagesRead);
    
    if (!updatedUser) {
        return NextResponse.json({ error: "User not found or update failed." }, { status: 404 });
    }

    return NextResponse.json({ 
        message: "Progress tracked successfully!", 
        newTotal: updatedUser.totalPagesRead 
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
