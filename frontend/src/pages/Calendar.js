import React, { useState, useEffect } from 'react';
import { contentAPI } from '../services/api';
import PostCard from '../components/PostCard';
import toast from 'react-hot-toast';

const Calendar = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    loadData();
  }, [currentMonth]);

  const loadData = async () => {
    setLoading(true);
    try {
      const profileRes = await contentAPI.getBusinessProfile();
      setProfile(profileRes.data);
      const postsRes = await contentAPI.getPosts(profileRes.data.id, currentMonth);
      setPosts(postsRes.data);
    } catch (err) {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!profile) return;
    setGenerating(true);
    try {
      await contentAPI.generateContent({
        business_id: profile.id,
        month: currentMonth
      });
      toast.success('30 days of content generated!');
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const handleUpdatePost = async (postId, data) => {
    try {
      await contentAPI.updatePost(postId, data);
      toast.success('Post updated!');
      loadData();
    } catch (err) {
      toast.error('Failed to update post');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await contentAPI.deletePost(postId);
      toast.success('Post deleted!');
      loadData();
    } catch (err) {
      toast.error('Failed to delete post');
    }
  };

  const getMonthLabel = () => {
    const [year, month] = currentMonth.split('-');
    return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const changeMonth = (direction) => {
    const [year, month] = currentMonth.split('-').map(Number);
    const date = new Date(year, month - 1 + direction);
    setCurrentMonth(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  const publishedCount = posts.filter(p => p.is_published).length;
  const pendingCount = posts.filter(p => !p.is_published).length;

  if (loading) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-dark-600 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Content Calendar</h1>
            <p className="text-gray-500 text-sm">{profile?.business_name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => changeMonth(-1)}
              className="w-9 h-9 flex items-center justify-center bg-dark-700 hover:bg-dark-600 border border-dark-600 text-gray-400 rounded-lg transition-all"
            >
              ←
            </button>
            <span className="text-white font-semibold min-w-[150px] text-center text-sm">
              {getMonthLabel()}
            </span>
            <button
              onClick={() => changeMonth(1)}
              className="w-9 h-9 flex items-center justify-center bg-dark-700 hover:bg-dark-600 border border-dark-600 text-gray-400 rounded-lg transition-all"
            >
              →
            </button>
            {posts.length === 0 && (
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="bg-primary hover:bg-primary/90 disabled:bg-dark-600 disabled:text-gray-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all flex items-center gap-2"
              >
                {generating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>✨ Generate Content</>
                )}
              </button>
            )}
          </div>
        </div>

        {posts.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-dark-700 border border-dark-600 rounded-xl p-5">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Posts</p>
              <p className="text-white text-2xl font-bold">{posts.length}</p>
            </div>
            <div className="bg-dark-700 border border-emerald-500/20 rounded-xl p-5">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Published</p>
              <p className="text-emerald-400 text-2xl font-bold">{publishedCount}</p>
            </div>
            <div className="bg-dark-700 border border-dark-600 rounded-xl p-5">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Pending</p>
              <p className="text-amber-400 text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-dark-600 rounded-2xl">
            <p className="text-4xl mb-4">📅</p>
            <p className="text-white font-semibold text-lg mb-2">No content for {getMonthLabel()}</p>
            <p className="text-gray-500 text-sm">Click "Generate Content" to create 30 days of posts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={handleUpdatePost}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;