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
        const user = User.findOne({ _id: userId }).select("-Password");
        return NextResponse.json({
            message: "User Found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}