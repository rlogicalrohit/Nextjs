import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import brcyptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exists" }, { status: 500 })
        }
        console.log("User Exists", user);
        if (!user.isVerfied) {
            return NextResponse.json({ error: "Please verify your email" }, { status: 400 })
        }
        const validPassword = await brcyptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Check your credentials" }, { status: 400 })
        }

        const tokendata = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(tokendata, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "Logged in success",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}