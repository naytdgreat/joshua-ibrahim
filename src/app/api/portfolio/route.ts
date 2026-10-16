import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio";
import { PortfolioData } from "@/types/portfolio";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or expired admin session. Please log in at /admin." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as PortfolioData;
    if (!body || !body.profile || !body.profile.name) {
      return NextResponse.json({ error: "Invalid portfolio data payload" }, { status: 400 });
    }

    const success = await savePortfolioData(body);
    if (!success) {
      const isConfigured = Boolean(
        process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
      );
      const errorMsg = !isConfigured
        ? "Vercel storage not connected. Please add a KV or Upstash Redis database in your Vercel project dashboard under 'Storage' to enable live saves."
        : "Failed to persist portfolio data to storage.";
      return NextResponse.json({ error: errorMsg }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
