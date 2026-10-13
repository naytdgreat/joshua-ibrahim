import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const envPassword = process.env.ADMIN_PASSWORD;

    if (!envPassword) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD is not configured in your .env or .env.local file." },
        { status: 500 }
      );
    }

    if (password !== envPassword) {
      return NextResponse.json(
        { error: "Incorrect admin password." },
        { status: 401 }
      );
    }

    // Set authenticated cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
  }
}
