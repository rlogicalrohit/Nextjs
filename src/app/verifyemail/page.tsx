'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function verifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false);
    const [seconds, setSeconds] = useState(5);


    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
            setError(false);

        } catch (error: any) {
            setError(true);
            console.log("error", error);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        console.log("urlToken", urlToken);
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if (token.length > 0) verifyUserEmail();
    }, [token])

    useEffect(() => {
        let timer: any;
        if (verified) {
            timer = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [verified]);

    useEffect(() => {
        if (seconds === 0 && verified) {
            // Redirect to login page after countdown
            window.location.href = '/login';
        }
    }, [seconds, verified]);


    return (<div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black'>{token ? `${token}` : "No Token"}</h2>
        {verified && (<div>
            <h2>Email Verified</h2>
            <h4>you are redirecting to login page within {`${seconds}`} seconds...</h4>
        </div>)}

        {error && (<div>
            <h2>Invalid</h2>
            <Link href="/login">Login Page</Link>
        </div>)}
    </div>)

}