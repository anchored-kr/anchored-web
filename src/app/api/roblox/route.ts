import { NextRequest } from "next/server";

/**
 * Server-side proxy for public Roblox game stats (the Roblox APIs don't allow
 * cross-origin browser calls). GET /api/roblox?placeId=123 →
 * { name, playing, visits, upVotes, downVotes, likeRatio, thumb, url }.
 * Cached at the edge for 30s; the client polls to keep CCU fresh.
 */

const FETCH_OPTS: RequestInit & { next: { revalidate: number } } = {
  headers: { "User-Agent": "anchored-web/1.0 (+https://anchored.kr)" },
  next: { revalidate: 30 },
};

export async function GET(req: NextRequest) {
  const placeId = req.nextUrl.searchParams.get("placeId");
  if (!placeId || !/^\d+$/.test(placeId)) {
    return Response.json({ error: "placeId required" }, { status: 400 });
  }

  try {
    const uRes = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`, FETCH_OPTS);
    const { universeId } = (await uRes.json()) as { universeId?: number };
    if (!universeId) throw new Error("universe not found");

    const [games, votes, thumbs] = await Promise.all([
      fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`, FETCH_OPTS).then((r) => r.json()),
      fetch(`https://games.roblox.com/v1/games/votes?universeIds=${universeId}`, FETCH_OPTS).then((r) => r.json()),
      fetch(
        `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&countPerUniverse=1&defaults=true&size=768x432&format=Png`,
        FETCH_OPTS
      ).then((r) => r.json()),
    ]);

    const g = games?.data?.[0] ?? {};
    const v = votes?.data?.[0] ?? {};
    const up = v.upVotes ?? 0;
    const down = v.downVotes ?? 0;

    return Response.json(
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
      { headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=120" } }
    );
  } catch {
    return Response.json({ error: "fetch_failed" }, { status: 502 });
  }
}
