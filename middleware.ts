import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const session = await getToken({ req });

    if (!session) {
        return NextResponse.redirect(new URL("/", req.url));
    }
}

export const config = {
    matcher: ["/resources", "/contributions"]
}