import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest) {
    try {
        console.log("VERIFYEMAIl      CALLED");

        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 500 })
        }

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        const data = await user.save();
        console.log("datadata", data);

        return NextResponse.json({ message: 'Email verfied Successfully...', success: true }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}