import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbconfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect()

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        console.log("userId",userId);
        
        const user = await User.findOne({ _id: userId }).select("-password")
        console.log("useruser",user);
        
        return NextResponse.json({
            message: "User Details Found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
