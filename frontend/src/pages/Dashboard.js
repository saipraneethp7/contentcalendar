import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentAPI.getBusinessProfile()
      .then(res => setProfile(res.data))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-dark-600 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="mb-10 relative">
          <div className="absolute -top-20 -left-20 w-[400px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Good day, {user?.full_name.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500">Here's an overview of your Craftly workspace.</p>
        </div>

        {!profile ? (
          <div className="border border-dashed border-dark-600 rounded-2xl p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/3 -z-10" />
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 text-3xl">
              🏢
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">Set up your business profile</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
              Tell us about your business so Craftly can generate content perfectly tailored to your brand, audience and tone.
            </p>
            <button
              onClick={() => navigate('/business-profile')}
              className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-lg transition-all text-sm"
            >
              Set Up Business Profile
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-700/80 backdrop-blur border border-dark-600 rounded-xl p-6">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Business</p>
                <p className="text-white font-semibold text-lg">{profile.business_name}</p>
              </div>
              <div className="bg-dark-700/80 backdrop-blur border border-dark-600 rounded-xl p-6">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Industry</p>
                <p className="text-white font-semibold text-lg">{profile.industry}</p>
              </div>
              <div className="bg-dark-700/80 backdrop-blur border border-dark-600 rounded-xl p-6">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Platforms</p>
                <p className="text-white font-semibold text-lg">{profile.platforms}</p>
              </div>
            </div>

            <div className="bg-dark-700/80 backdrop-blur border border-dark-600 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold">Business Details</h2>
                <button
                  onClick={() => navigate('/business-profile')}
                  className="text-xs text-gray-500 hover:text-white border border-dark-600 hover:border-gray-500 px-3 py-1.5 rounded-lg transition-all"
                >
                  Edit Profile
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Target Audience</p>
                  <p className="text-gray-300 text-sm">{profile.target_audience}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Tone of Voice</p>
                  <p className="text-gray-300 text-sm">{profile.tone}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/calendar')}
                className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>🗓️</span> View Content Calendar
              </button>
              <button
                onClick={() => navigate('/calendar')}
                className="bg-dark-700/80 hover:bg-dark-600 border border-dark-600 text-white font-medium px-6 py-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>✨</span> Generate New Content
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;