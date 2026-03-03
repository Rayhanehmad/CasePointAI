'use client';

import Link from 'next/link';
import { Scale } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-800">CasePointAI</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
        
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-6">
          <p className="text-sm">
            <strong>Authentication Coming Soon!</strong><br/>
            The login system will be available once the database is configured.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled
            />
          </div>

          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
          >
            Login (Coming Soon)
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500 font-semibold hover:text-blue-600">
              Sign up
            </Link>
          </p>
          <Link href="/" className="text-gray-500 text-sm mt-2 hover:text-gray-700 block">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
