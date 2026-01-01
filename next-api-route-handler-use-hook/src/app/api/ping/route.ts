import { verifyJwt } from "lib/jwt";
import { connectDB } from "../../../lib/db";
import { NextResponse } from "next/server";

// export async function GET() {
//     await connectDB();
//     return NextResponse.json({ ok: true });
// }


// import { NextResponse } from "next/server";
// import { verifyJwt } from "@/lib/jwt";

export async function GET() {
    const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTU1M2MyZGZkNWI4YzFlZjAxNDViNmQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NzE5NTAxNCwiZXhwIjoxNzY3Nzk5ODE0fQ.g9Gcoj9_tugSt7cmVaSusjBQvhIc7mjJT7r9P8rgsXA"; // replace with a real JWT for testing
    const payload = verifyJwt(testToken);

    console.log("Decoded payload:", payload);

    return NextResponse.json({ payload });
}
