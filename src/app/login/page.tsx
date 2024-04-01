'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {

  })
  const [user, SetUser] = React.useState({
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      console.log("user", user);
      setLoading(true);
      const response: any = await axios.post("/api/users/login", user);
      console.log("SIGN UP RESPONSE", response);
      router.push("/profile");
    } catch (error: any) {
      console.log("Sign Up failed", error);
      toast.success("Error", { position: "top-center" })
      router.push('/login')
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Login Page here"}</h1>
      <hr />
      <br />

      <label htmlFor="username">Email</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' type='email' id="email" value={user.email} placeholder='Email' onChange={(e) => { SetUser({ ...user, email: e.target.value }) }} />

      <label htmlFor="username">Password</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' type='text' id="password" value={user.password} placeholder='Password' onChange={(e) => { SetUser({ ...user, password: e.target.value }) }} />

      {buttonDisabled ? <button className='bg-gray-300 text-black-50 p-2 rounded-lg' disabled>Login</button> : <button className='bg-blue-600 p-2 rounded-lg text-white' onClick={onLogin}>Login</button>}

      <Link href='/signup'>SignUp here</Link>
    </div>
  )
}