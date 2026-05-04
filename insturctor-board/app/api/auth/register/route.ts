import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { hashPassword, setSessionCookie } from "@/lib/auth";

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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "password must be at least 8 characters" },
      { status: 400 },
    );
  }

  const passwordHash = await hashPassword(password);

  try {
    const { rows } = await pool.query<{ id: number; email: string }>(
      `INSERT INTO students (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email`,
      [normalized, passwordHash],
    );
    const student = rows[0];

    await setSessionCookie(student.id);

    return NextResponse.json({ id: student.id, email: student.email });
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      return NextResponse.json(
        { error: "email already registered" },
        { status: 409 },
      );
    }
    throw err;
  }
}
