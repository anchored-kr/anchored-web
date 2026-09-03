import { NextRequest } from "next/server";
import { allowedPlaceIds } from "@/data/desktopItems";

/**
 * Server-side proxy for public Roblox game stats (the Roblox APIs don't allow
 * cross-origin browser calls). GET /api/roblox?placeId=123 →
 * { name, playing, visits, upVotes, downVotes, likeRatio, thumb, url }.
 *
 * Only place IDs referenced by the catalogue are fetchable, so this can't be used
 * as an open proxy, and every upstream call is bounded by a timeout.
 */

const TIMEOUT_MS = 6_000;
const REVALIDATE_S = 30;

const upstream = (url: string) =>
  fetch(url, {
    headers: { "User-Agent": "anchored-web/1.0 (+https://anchored.kr)" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: REVALIDATE_S },
  });

const json = (body: unknown, status: number, cache?: string) =>
  Response.json(body, {
    status,
    headers: cache ? { "Cache-Control": cache } : undefined,
  });

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("placeId");
  if (!raw || !/^\d{1,20}$/.test(raw)) {
    return json({ error: "placeId_invalid" }, 400);
  }

  const placeId = Number(raw);
  if (!allowedPlaceIds.has(placeId)) {
    // Not one of our games — refuse rather than proxying arbitrary lookups.
    return json({ error: "place_not_allowed" }, 403);
  }

  try {
    const uRes = await upstream(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
    if (!uRes.ok) return json({ error: "upstream_error" }, 502);

    const { universeId } = (await uRes.json()) as { universeId?: number };
    if (!universeId) return json({ error: "place_not_found" }, 404);

    const [games, votes, thumbs] = await Promise.all([
      upstream(`https://games.roblox.com/v1/games?universeIds=${universeId}`).then((r) => (r.ok ? r.json() : null)),
      upstream(`https://games.roblox.com/v1/games/votes?universeIds=${universeId}`).then((r) => (r.ok ? r.json() : null)),
      upstream(
        `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&countPerUniverse=1&defaults=true&size=768x432&format=Png`
      ).then((r) => (r.ok ? r.json() : null)),
    ]);

    const g = games?.data?.[0] ?? {};
    const v = votes?.data?.[0] ?? {};
    const up = typeof v.upVotes === "number" ? v.upVotes : 0;
    const down = typeof v.downVotes === "number" ? v.downVotes : 0;

    return json(
      {
        name: g.name ?? null,
        playing: typeof g.playing === "number" ? g.playing : null,
        visits: typeof g.visits === "number" ? g.visits : null,
        upVotes: up,
        downVotes: down,
        likeRatio: up + down > 0 ? Math.round((up / (up + down)) * 100) : null,
        thumb: thumbs?.data?.[0]?.thumbnails?.[0]?.imageUrl ?? null,
        url: `https://www.roblox.com/games/${placeId}`,
      },
      200,
      `s-maxage=${REVALIDATE_S}, stale-while-revalidate=120`
    );
  } catch (e) {
    const timedOut = e instanceof DOMException && e.name === "TimeoutError";
    return json({ error: timedOut ? "upstream_timeout" : "fetch_failed" }, 504);
  }
}
