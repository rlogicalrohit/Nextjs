'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ProfilePage({ params }: any) {

    const router = useRouter();
    const [id] = params.id;
    const [data, setData]: any = useState("nothing");

    useEffect(() => {

        const getUserDetails = async () => {
            try {
                const res: any = await axios.post("/api/users/me");
                console.log(res.data);
                setData(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUserDetails()
    }, [params.id])

    return (
        <>
            <div>User Details Page</div>
            <h2>User Id: {id}</h2>
            <h2>User username: {data.username}</h2>
            <h2>User email: {data.email}</h2>
        </>
    )

}