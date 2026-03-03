'use client';

import Link from 'next/link';
import { Scale } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-800">CasePointAI</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Start Your Free Trial</h2>
        <p className="text-gray-600 mb-6">7 days free, then ₨4,800/year</p>
        
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-6">
          <p className="text-sm">
            <strong>Registration Coming Soon!</strong><br/>
            The signup system will be available once the database is configured.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Muhammad Ali"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled
            />
          </div>

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
            Sign Up (Coming Soon)
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 font-semibold hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
