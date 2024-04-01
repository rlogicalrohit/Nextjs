'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState("nothing");

    const getUserDetails = async () => {
        try {
            const res: any = await axios.post("/api/users/me");
            console.log(res.data);
            setData(res.data.data._id)
        } catch (error) {
            console.log(error);

        }
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully", { position: "top-center" })
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>

            <h1>Profile Page</h1>
            <hr />
            <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button onClick={logout}>Logout</button>
            <button onClick={getUserDetails}>Get User</button>
        </div>
    )
}