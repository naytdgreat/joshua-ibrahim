import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio";
import { PortfolioData } from "@/types/portfolio";

export async function GET() {
  try {
    const data = getPortfolioData();
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

    const success = savePortfolioData(body);
    if (!success) {
      return NextResponse.json({ error: "Failed to persist portfolio data" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
