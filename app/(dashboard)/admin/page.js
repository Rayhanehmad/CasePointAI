'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Scale, Shield, Upload, Trash2, Edit, Eye, Plus, Users, Database, TrendingUp, LogOut, Menu, X, FileText, BookOpen } from 'lucide-react';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export default function AdminPanel() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('citations');
  const [citations, setCitations] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkAdmin();
    fetchData();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    // Check if user is admin
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@casepointai.com';
    if (user.email !== adminEmail) {
      alert('Unauthorized access. Admin only.');
      router.push('/dashboard');
      return;
    }

    setUser(user);
    setIsAdmin(true);
  };

  const fetchData = async () => {
    try {
      // Fetch citations
      const { data: citationsData } = await supabase
        .from('citations')
        .select('*')
        .order('created_at', { ascending: false });

      setCitations(citationsData || []);

      // Fetch subscribers
      const { data: subscribersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      setSubscribers(subscribersData || []);

      // Calculate stats
      const { count: totalCitations } = await supabase
        .from('citations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      const { count: totalSubscribers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const activeSubscribers = subscribersData?.filter(s => s.subscription_status === 'active').length || 0;

      setStats({
        totalCitations: totalCitations || 0,
        totalSubscribers: totalSubscribers || 0,
        activeSubscribers,
        monthlyRevenue: activeSubscribers * 1200
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert('Please select a file');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setShowUploadModal(false);
        setUploadFile(null);
        fetchData();
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCitation = async (id) => {
    if (!confirm('Are you sure you want to delete this citation?')) return;

    try {
      const { error } = await supabaseAdmin
        .from('citations')
        .update({ status: 'deleted' })
        .eq('id', id);

      if (error) throw error;

      alert('Citation deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete citation');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">Admin access only</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-2 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <p className="text-xs text-gray-500">CasePointAI</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg">
                <BookOpen className="w-5 h-5" />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-red-600">
                <LogOut className="w-5 h-5" />
              </button>
            </nav>

            <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-6">
            <button onClick={() => setSidebarOpen(false)} className="mb-6">
              <X className="w-6 h-6" />
            </button>
            <nav className="space-y-4">
              <Link href="/dashboard" className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                <BookOpen className="w-5 h-5" />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-red-600">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8" />
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          </div>
          <p className="text-red-100">Manage citations, users, and system settings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <Database className="w-8 h-8 text-blue-600 mb-3" />
            <p className="text-gray-600 text-sm mb-1">Total Citations</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalCitations}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <Users className="w-8 h-8 text-green-600 mb-3" />
            <p className="text-gray-600 text-sm mb-1">Active Subscribers</p>
            <p className="text-3xl font-bold text-gray-800">{stats.activeSubscribers}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
            <p className="text-gray-600 text-sm mb-1">Monthly Revenue</p>
            <p className="text-3xl font-bold text-gray-800">₨{stats.monthlyRevenue?.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <FileText className="w-8 h-8 text-orange-600 mb-3" />
            <p className="text-gray-600 text-sm mb-1">Total Users</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalSubscribers}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('citations')}
            className={`px-4 py-3 font-semibold border-b-2 transition ${
              activeTab === 'citations'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
          >
            Citations Management
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-3 font-semibold border-b-2 transition ${
              activeTab === 'subscribers'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
          >
            Subscribers
          </button>
        </div>

        {/* Citations Tab */}
        {activeTab === 'citations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Manage Citations</h3>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload Word Document
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700">Title</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Citation</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Year</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Views</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citations.slice(0, 20).map(citation => (
                      <tr key={citation.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <p className="font-semibold text-gray-800">{citation.title}</p>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{citation.citation_number}</td>
                        <td className="p-4 text-sm text-gray-600">{citation.year}</td>
                        <td className="p-4 text-sm text-gray-600">{citation.views || 0}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            citation.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {citation.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Link
                              href={`/citation/${citation.id}`}
                              className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCitation(citation.id)}
                              className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Subscriber Management</h3>

            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Plan</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Join Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map(subscriber => (
                      <tr key={subscriber.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-semibold text-gray-800">{subscriber.email}</td>
                        <td className="p-4 text-sm text-gray-600">{subscriber.full_name || 'N/A'}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            subscriber.subscription_status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : subscriber.subscription_status === 'trial'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {subscriber.subscription_status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{subscriber.subscription_plan}</td>
                        <td className="p-4 text-sm text-gray-600">
                          {new Date(subscriber.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Upload className="w-6 h-6 text-white" />
                <h3 className="text-white font-semibold text-xl">Upload Citations Document</h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Word Document (.docx)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                  <input
                    type="file"
                    accept=".docx,.doc"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-1">
                      {uploadFile ? uploadFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500">Word documents only (.docx, .doc)</p>
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Document Format:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Each citation should start with the title in bold</li>
                  <li>• Include citation number (e.g., PLD 2023 SC 123)</li>
                  <li>• Separate citations with double line breaks</li>
                  <li>• The system will auto-extract and categorize</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleFileUpload}
                  disabled={!uploadFile || uploading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : 'Upload & Process'}
                </button>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadFile(null);
                  }}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
