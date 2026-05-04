import { createHmac, timingSafeEqual } from "node:crypto";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import { pool } from "@/lib/db";

const COOKIE_NAME = "student_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type Student = { id: number; email: string };

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;

  if (!secret) throw new Error("SESSION_SECRET is not set");

  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function encodeToken(studentId: number): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = Buffer.from(JSON.stringify({ id: studentId, exp })).toString(
    "base64url",
  );

  return `${payload}.${sign(payload)}`;
}

function decodeToken(token: string): { id: number } | null {
  const [payload, sig] = token.split(".");

  if (!payload || !sig) return null;

  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);

  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString());

    if (typeof parsed.id !== "number" || typeof parsed.exp !== "number") {
      return null;
    }
    if (parsed.exp < Math.floor(Date.now() / 1000)) return null;

    return { id: parsed.id };
  } catch {
    return null;
  }
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function setSessionCookie(studentId: number): Promise<void> {
  const store = await cookies();

  store.set(COOKIE_NAME, encodeToken(studentId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();

  store.delete(COOKIE_NAME);
}

export async function getCurrentStudent(): Promise<Student | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;

  if (!token) return null;

  const decoded = decodeToken(token);

  if (!decoded) return null;

  const { rows } = await pool.query<Student>(
    "SELECT id, email FROM students WHERE id = $1",
    [decoded.id],
  );

  return rows[0] ?? null;
}
