"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import { useAuth } from '@/context/authContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "@/styles/sign-in.css"; // Import the CSS file
import { Input } from '@/components/ui/input';

export default function SignIn() {
  // const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userData = { email, password, role };

    try {
      const response = await fetch(`${process.env.API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('authUser', JSON.stringify(data.user));
        }
        if (data.user.role === 'admin') {
          router.push('/admin-dashboard');
        } else {
          router.push('/dashboard');
        }
        toast("User Logged In");
      } else {
        toast(data.message || "User Login Failed");
      }
    } catch (error) {
      toast("An error occurred during sign in");
    }
  };
// console.log(process.env.API_URL)
  return (
    <div className='sign-in-container'>
      <div className="form-container">
        <div className="form-image"></div>
        <div className="form-content">
          <div className="logo-container">
            <Image className="logo" src="/assets/BrainWave-logo.png" alt="BrainWave Logo" width={100} height={100} />
          </div>
          <h2 className="welcome-text">Welcome back!</h2>
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group ">
              <label htmlFor="role">Role</label>
              <Select onValueChange={setRole} value={role} >
                <SelectTrigger className="select-role">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Student</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="submit-button-container">
              <Button type="submit" className="submit-button">
                Sign In
              </Button>
            </div>
          </form>

          <div className="sign-up-text">
            <p>Don{`'`}t have an account?
              <Link href="/sign-up" className="sign-up-link">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster position='bottom-right'/>
    </div>
  );
}
