import { AccessToken } from "livekit-server-sdk";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const roomName = process.env.LIVEKIT_ROOM;
  const url = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !roomName || !url) {
    return Response.json(
      { error: "LiveKit env missing (LIVEKIT_*, NEXT_PUBLIC_LIVEKIT_URL)" },
      { status: 503 },
    );
  }

  const role = new URL(req.url).searchParams.get("role");
  if (role !== "publisher" && role !== "viewer") {
    return Response.json({ error: "role must be publisher or viewer" }, { status: 400 });
  }

  const identity = `${role}-${crypto.randomUUID()}`;
  const at = new AccessToken(apiKey, apiSecret, { identity, ttl: "1h" });

  if (role === "publisher") {
    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: false,
    });
  } else {
    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: false,
      canSubscribe: true,
    });
  }

  const token = await at.toJwt();
  return Response.json({ token, url });
}
