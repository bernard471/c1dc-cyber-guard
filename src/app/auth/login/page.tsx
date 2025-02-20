'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from "next-auth/react"
import { FcGoogle } from 'react-icons/fc';
import LogoImage from '@/images/Logoimage.png';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong');
      console.error(error);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
{/* Left side - Decorative */}
<div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 justify-center items-center p-12 relative">
  {/* Background Logo */}
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Image src={LogoImage} alt="Background Logo" width={400} height={400} className="object-contain" />
  </div>
  {/* Content with overlay */}
  <div className="max-w-md text-white relative z-10">
    <h1 className="text-4xl font-bold mb-6">Welcome to Cyber<span className="text-orange-500">1</span>Guard</h1>
    <p className="text-xl">Secure your digital assets with enterprise-grade protection</p>
  </div>
</div>


      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Link href="/" className="flex items-center">
            <Image  src={LogoImage} alt="Logo" width={32} height={32} />
            <span className="ml-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Cyber<span className="text-orange-500">1</span>Guard
              </span>
            </Link>
          </div>
            <h2 className="text-3xl font-bold text-gray-900">Sign in to Cyber<span className="text-orange-500">1</span>Guard</h2>
            <p className="mt-2 text-sm text-gray-600">
              Protect your business with advanced security
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
            >
              Sign in to your account
            </button>
            <button
            type="button"
            onClick={() => signIn('google')}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
          >
              <FcGoogle className="w-5 h-5" />
              Continue with Google
          </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
