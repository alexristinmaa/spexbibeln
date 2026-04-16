import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps, cert, ServiceAccount } from "firebase-admin/app";

if (!getApps().length) {
  if (process.env.USE_LOCAL_FIREBASE_CREDENTIALS) {
    const serviceAccount = await import("../../../firebase_service_account.json");
    initializeApp({ credential: cert(serviceAccount as ServiceAccount) });
  } else {
    initializeApp();
  }
}

export async function POST(req: NextRequest) {
  // Verify Firebase token from Authorization header
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await getAuth().verifyIdToken(token);
  } catch (e) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Token valid — trigger redeploy
  const res = await fetch(
    "https://api.github.com/repos/alexristinmaa/spexbibeln/dispatches",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PAT}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({ event_type: "redeploy" }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to trigger redeploy" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}