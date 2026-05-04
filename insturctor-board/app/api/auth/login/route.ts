import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { setSessionCookie, verifyPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as {
    email?: unknown;
    password?: unknown;
  };

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  const { rows } = await pool.query<{
    id: number;
    email: string;
    password_hash: string;
  }>(
    "SELECT id, email, password_hash FROM students WHERE email = $1",
    [normalized],
  );
  const student = rows[0];

  if (!student || !(await verifyPassword(password, student.password_hash))) {
    return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
  }

  await setSessionCookie(student.id);

  return NextResponse.json({ id: student.id, email: student.email });
}
