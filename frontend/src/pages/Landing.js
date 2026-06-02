import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '✨',
    title: 'AI-Powered Content',
    description: 'Generate 30 days of tailored social media posts in seconds using advanced AI.'
  },
  {
    icon: '🗓️',
    title: 'Visual Calendar',
    description: 'See your entire month laid out clearly. Know exactly what to post and when.'
  },
  {
    icon: '🎯',
    title: 'Brand Tailored',
    description: 'Every post matches your industry, audience, tone and platforms perfectly.'
  },
  {
    icon: '✏️',
    title: 'Edit Anything',
    description: 'Not happy with a post? Edit it directly or regenerate it with one click.'
  },
  {
    icon: '📊',
    title: 'Track Progress',
    description: 'Mark posts as published and track how consistent your content strategy is.'
  },
  {
    icon: '⚡',
    title: 'Multiple Platforms',
    description: 'Instagram, Twitter and LinkedIn content all generated and managed in one place.'
  }
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute left-1/4 top-40 w-[500px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">

        <div className="pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-4 py-2 rounded-full mb-8">
            <span>✍️</span> AI-Powered Social Media Management
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            30 days of content.<br />
            <span className="text-primary">Generated in seconds.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop stressing about what to post. Craftly uses AI to generate
            a full month of social media content tailored to your business, audience and tone.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all text-sm"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-dark-700 hover:bg-dark-600 border border-dark-600 text-white font-medium px-8 py-4 rounded-xl transition-all text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="bg-dark-700/80 backdrop-blur border border-dark-600 rounded-2xl p-8 mb-24">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {['Instagram', 'Twitter', 'LinkedIn'].map(platform => (
              <div key={platform} className="bg-dark-800 border border-dark-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                    platform === 'Instagram' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                    platform === 'Twitter' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    'bg-blue-700/10 text-blue-300 border-blue-700/20'
                  }`}>{platform}</span>
                  <span className="text-gray-600 text-xs">Day 1</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 uppercase">Educational</span>
                <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                  {platform === 'Instagram' ? "New month, new goals! Let's start with proper form to avoid injuries. Share your favorite exercise below! 💪" :
                   platform === 'Twitter' ? "Did you know proper form is the #1 thing beginners get wrong? Here's a quick guide to get it right from day one." :
                   'Starting a fitness journey? The most important investment you can make is learning proper form before increasing weight.'}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-xs">Sample AI-generated content for a fitness business</p>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need to stay consistent</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Built for small business owners, freelancers and creators who know consistency matters but struggle to find the time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div key={feature.title} className="bg-dark-700/80 backdrop-blur border border-dark-600 hover:border-primary/30 rounded-xl p-6 transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-xl">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-dark-700/80 backdrop-blur border border-dark-600 rounded-2xl p-16 mb-24">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to save hours every week?</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
            Join hundreds of small businesses already using Craftly to stay consistent on social media.
          </p>
          <Link
            to="/register"
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all text-sm inline-block"
          >
            Start for Free
          </Link>
        </div>

        <div className="border-t border-dark-600 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">✍️</span>
            <span className="text-gray-500 text-sm font-semibold">Craftly</span>
          </div>
          <p className="text-gray-600 text-xs">Built with React, FastAPI and PostgreSQL</p>
        </div>

      </div>
    </div>
  );
};

export default Landing;