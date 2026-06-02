import React, { useState } from 'react';

const platformColors = {
  Instagram: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Twitter: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  LinkedIn: 'bg-blue-700/10 text-blue-300 border-blue-700/20',
};

const postTypeColors = {
  educational: 'bg-amber-500/10 text-amber-400',
  promotional: 'bg-emerald-500/10 text-emerald-400',
  entertaining: 'bg-purple-500/10 text-purple-400',
  inspirational: 'bg-red-500/10 text-red-400',
};

const PostCard = ({ post, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(post.caption);
  const [hashtags, setHashtags] = useState(post.hashtags);

  const handleSave = () => {
    onUpdate(post.id, { caption, hashtags });
    setEditing(false);
  };

  const handlePublishToggle = () => {
    onUpdate(post.id, { is_published: !post.is_published });
  };

  return (
    <div className={`bg-dark-700 rounded-xl border transition-all hover:border-dark-500 flex flex-col gap-4 p-5 ${post.is_published ? 'border-emerald-500/30' : 'border-dark-600'}`}>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${platformColors[post.platform] || 'bg-primary/10 text-primary border-primary/20'}`}>
          {post.platform}
        </span>
        <span className="text-gray-600 text-xs font-medium">Day {post.day_number}</span>
      </div>

      <span className={`text-xs font-semibold px-2 py-1 rounded-md self-start uppercase tracking-wide ${postTypeColors[post.post_type?.toLowerCase()] || 'bg-gray-500/10 text-gray-400'}`}>
        {post.post_type}
      </span>

      {editing ? (
        <div className="flex flex-col gap-3">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            className="bg-dark-800 border border-primary/30 rounded-lg text-white px-3 py-2 text-sm resize-none focus:outline-none focus:border-primary transition-colors"
          />
          <input
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            className="bg-dark-800 border border-primary/30 rounded-lg text-primary px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs font-medium py-2 rounded-lg transition-all"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex-1 bg-dark-800 hover:bg-dark-600 border border-dark-600 text-gray-400 text-xs font-medium py-2 rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-300 text-sm leading-relaxed flex-1">{post.caption}</p>
      )}

      {!editing && (
        <>
          <p className="text-primary/70 text-xs leading-relaxed">{post.hashtags}</p>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>⏰ Best time: {post.best_time}</span>
            {post.is_published && <span className="text-emerald-400 font-medium">✓ Published</span>}
          </div>
        </>
      )}

      {!editing && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={handlePublishToggle}
            className={`flex-1 text-xs font-medium py-2 rounded-lg border transition-all ${
              post.is_published
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-dark-800 border-dark-600 text-gray-500 hover:text-white hover:border-gray-500'
            }`}
          >
            {post.is_published ? 'Published ✓' : 'Mark Published'}
          </button>
          <button
            onClick={() => setEditing(true)}
            className="px-3 py-2 bg-dark-800 hover:bg-dark-600 border border-dark-600 text-gray-400 hover:text-white text-xs rounded-lg transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="px-3 py-2 bg-dark-800 hover:bg-red-500/10 border border-dark-600 hover:border-red-500/30 text-gray-400 hover:text-red-400 text-xs rounded-lg transition-all"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;