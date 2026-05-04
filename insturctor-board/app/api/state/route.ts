import { NextRequest, NextResponse } from "next/server";

import { dispatch, getState } from "@/lib/session-store";
import type { SessionAction } from "@/types/session";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getState());
}

export async function POST(req: NextRequest) {
  const action = (await req.json()) as SessionAction;
  const state = dispatch(action);

  return NextResponse.json(state);
}
