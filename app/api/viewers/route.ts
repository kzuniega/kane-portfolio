import { createHmac } from "node:crypto";
import { isIP } from "node:net";

export const runtime = "nodejs";

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const candidates = [
    ...(forwardedFor ? forwardedFor.split(",") : []),
    ...(realIp ? [realIp] : []),
  ].map((value) => value.trim());

  return candidates.find((candidate) => isIP(candidate) !== 0);
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const hashSecret = process.env.VIEWER_HASH_SECRET;
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();
  const legacyServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const apiKey = secretKey || legacyServiceRoleKey;

  if (!clientIp) {
    return Response.json({ error: "Unable to determine visitor address." }, { status: 400 });
  }
  if (!hashSecret || hashSecret.length < 32 || !supabaseUrl || !apiKey) {
    console.error("Viewer count is missing Supabase or hash-secret configuration.");
    return Response.json({ error: "Viewer count is not configured." }, { status: 503 });
  }

  const visitDate = new Date().toISOString().slice(0, 10);
  const viewerHash = createHmac("sha256", hashSecret)
    .update(`${visitDate}:${clientIp}`)
    .digest("hex");

  let response: Response;
  try {
    response = await fetch(`${supabaseUrl}/rest/v1/rpc/track_daily_unique_visitor`, {
      method: "POST",
      headers: {
        apikey: apiKey,
        ...(secretKey ? {} : { Authorization: `Bearer ${legacyServiceRoleKey}` }),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ p_visit_date: visitDate, p_viewer_hash: viewerHash }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Supabase viewer-count request failed.", error);
    return Response.json({ error: "Viewer count is temporarily unavailable." }, { status: 502 });
  }

  if (!response.ok) {
    console.error(`Supabase rejected viewer-count request with status ${response.status}.`);
    return Response.json({ error: "Viewer count is temporarily unavailable." }, { status: 502 });
  }

  let count: unknown;
  try {
    count = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Supabase returned an unreadable viewer count.");
      return Response.json({ error: "Viewer count is temporarily unavailable." }, { status: 502 });
    }
    throw error;
  }

  if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0) {
    console.error("Supabase returned an invalid viewer count.");
    return Response.json({ error: "Viewer count is temporarily unavailable." }, { status: 502 });
  }

  return Response.json({ count });
}
