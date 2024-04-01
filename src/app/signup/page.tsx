'use client';
import React, { useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function signUpPage() {
  const router = useRouter();
  const [user, SetUser] = React.useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      console.log("user", user);
      setLoading(true);
      const response: any = await axios.post("/api/users/signup", user);
      console.log("SIGN UP RESPONSE", response);
      router.push("/login");
    } catch (error: any) {
      console.log("Sign Up failed", error);
      toast.success("Error", { position: "top-center" })
      router.push('/signup')
      setLoading(false);
    }
  }


  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Sign up Page here"}</h1>
      <hr />
      <br />
      <label htmlFor="username">Username</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' type='text' id="username" value={user.username} placeholder='Username' onChange={(e) => { SetUser({ ...user, username: e.target.value }) }} />

      <label htmlFor="username">Email</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' type='email' id="email" value={user.email} placeholder='Email' onChange={(e) => { SetUser({ ...user, email: e.target.value }) }} />

      <label htmlFor="username">Password</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' type='text' id="password" value={user.password} placeholder='Password' onChange={(e) => { SetUser({ ...user, password: e.target.value }) }} />

      {buttonDisabled ? <button className='bg-gray-300 text-black-50 p-2 rounded-lg' disabled>Sign Up</button> : <button className='bg-blue-600 p-2 rounded-lg text-white' onClick={onSignUp}>Sign Up</button>}

      <Link href='/login'>Login here</Link>
    </div>
  )
}