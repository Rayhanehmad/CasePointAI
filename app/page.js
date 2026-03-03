import Link from 'next/link';
import { Scale, Brain, Search, TrendingUp, Newspaper, FileSearch, Zap, Award, Calendar, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">CasePointAI</span>
              <p className="text-xs text-blue-200">Powered by AI</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="text-white hover:text-blue-300 transition">
              Login
            </Link>
            <Link href="/signup" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Pakistan's First AI-Powered<br/>Legal Research Platform
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            Access all major law journals (PLD, SCMR, CLC, PCrLJ, PTD, PLC, CLD, YLR, MLD)<br/>
            Enhanced with AI Assistant for instant legal analysis
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition shadow-xl">
              Start 7-Day Free Trial
            </Link>
            <Link href="/dashboard" className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition border border-white/30">
              View Demo
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
            <Brain className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">AI Legal Assistant</h3>
            <p className="text-blue-200 text-sm">Smart chatbot for instant case analysis</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
            <Newspaper className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">All Law Journals</h3>
            <p className="text-blue-200 text-sm">PLD, SCMR, CLC, PCrLJ, PTD, PLC, CLD, YLR, MLD</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
            <FileSearch className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Statutes & Acts</h3>
            <p className="text-blue-200 text-sm">Federal & provincial legislation</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
            <Zap className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Counter Arguments</h3>
            <p className="text-blue-200 text-sm">AI finds opposing precedents</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 text-center">
            <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Quarterly</h3>
            <div className="text-4xl font-bold text-blue-600 mb-4">₨1,200</div>
            <p className="text-gray-600 mb-6">3 months access</p>
            <Link href="/signup?plan=quarterly" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold w-full block text-center">
              Choose Plan
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-center border-4 border-yellow-400 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <Award className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Annual</h3>
            <div className="text-4xl font-bold text-white mb-4">₨4,800</div>
            <p className="text-blue-100 mb-6">12 months - Save 60%!</p>
            <Link href="/signup?plan=annual" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-bold w-full block text-center">
              Start Free Trial
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center">
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Law Firm</h3>
            <div className="text-4xl font-bold text-purple-600 mb-4">Custom</div>
            <p className="text-gray-600 mb-6">Multiple users</p>
            <Link href="/contact" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold w-full block text-center">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
