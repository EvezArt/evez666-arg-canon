import crypto from "node:crypto";

const PUZZLES = new Map([
  [
    "2bfa59217ae208ae",
    {
      round_n: 461,
      tau: 24,
      fire_hash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
      realm_id: "evez666-realm-2",
      realm_url: "https://evez666-realm-2.vercel.app",
      reward_gumroad_slug: "extreme_lore_pack_chapter_unlock",
    },
  ],
]);

const sha256 = (value) =>
  crypto.createHash("sha256").update(value, "utf8").digest("hex");

const safeEqualHex = (a, b) => {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const aa = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
};

const distinctPrimeFactorCount = (n) => {
  let x = n;
  let count = 0;
  for (let p = 2; p * p <= x; p += p === 2 ? 1 : 2) {
    if (x % p !== 0) continue;
    count += 1;
    while (x % p === 0) x = Math.floor(x / p);
  }
  if (x > 1) count += 1;
  return count;
};

const getLockPrefix = (req) => {
  const raw = req.query?.lock;
  return Array.isArray(raw) ? raw[0] : raw;
};

const getSubmitted = (req) => {
  const queryValue =
    req.query?.solution ??
    req.query?.submitted ??
    req.query?.answer;

  if (typeof queryValue === "string") return queryValue.trim();

  const body = req.body;
  if (body && typeof body === "object") {
    return String(body.solution ?? body.submitted ?? body.answer ?? "").trim();
  }

  if (typeof body === "string") {
    try {
      const parsed = JSON.parse(body);
      return String(
        parsed.solution ?? parsed.submitted ?? parsed.answer ?? ""
      ).trim();
    } catch {
      return body.trim();
    }
  }

  return "";
};

export default async function handler(req, res) {
  const lockPrefix = getLockPrefix(req);
  const puzzle = PUZZLES.get(lockPrefix);

  if (!puzzle) {
    return res.status(404).json({
      status: "UNKNOWN_LOCK",
      accepted: false,
      lock_prefix: lockPrefix ?? null,
    });
  }

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({
      status: "METHOD_NOT_ALLOWED",
      accepted: false,
    });
  }

  const N = puzzle.round_n + 80;
  const omega = distinctPrimeFactorCount(N);
  const canonicalSolution = sha256(
    `${puzzle.tau}:${N}:${omega}:${puzzle.fire_hash.slice(0, 8)}`
  );
  const submitted = getSubmitted(req);

  const accepted =
    submitted.length === canonicalSolution.length &&
    safeEqualHex(submitted, canonicalSolution);

  const payload = {
    status: accepted ? "ACCEPTED" : "REJECTED",
    accepted,
    lock_prefix: lockPrefix,
    round_n: puzzle.round_n,
    tau: puzzle.tau,
    N,
    omega,
    realm_id: puzzle.realm_id,
    realm_url: puzzle.realm_url,
    reward_gumroad_slug: puzzle.reward_gumroad_slug,
    canonical_solution_sha256: accepted ? canonicalSolution : undefined,
    state_transition: accepted
      ? {
          event: "PUZZLE_ACCEPTED",
          subject: puzzle.realm_id,
          prerequisite: "R461 EXTREME_FIRE",
          realm_access: "granted",
        }
      : undefined,
  };

  return res.status(accepted ? 200 : 400).json(payload);
}
