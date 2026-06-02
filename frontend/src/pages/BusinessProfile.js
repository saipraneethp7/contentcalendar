import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentAPI } from '../services/api';
import toast from 'react-hot-toast';

const BusinessProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    industry: '',
    target_audience: '',
    tone: '',
    platforms: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contentAPI.createBusinessProfile(formData);
      toast.success('Business profile created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-dark-800 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div className="min-h-screen bg-dark-900 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Set Up Your Business</h1>
          <p className="text-gray-500 text-sm">
            This information powers our AI to generate content that actually sounds like your brand.
          </p>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClass}>Business Name</label>
              <input
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                placeholder="e.g. Sai's Bakery"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select your industry</option>
                <option value="Bakery & Food">Bakery & Food</option>
                <option value="Fitness & Gym">Fitness & Gym</option>
                <option value="Fashion & Clothing">Fashion & Clothing</option>
                <option value="Beauty & Salon">Beauty & Salon</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Restaurant">Restaurant</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Freelancing">Freelancing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Target Audience</label>
              <input
                type="text"
                name="target_audience"
                value={formData.target_audience}
                onChange={handleChange}
                placeholder="e.g. Young adults aged 18-35 who love healthy food"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Tone of Voice</label>
              <select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select your tone</option>
                <option value="Professional">Professional</option>
                <option value="Fun & Playful">Fun & Playful</option>
                <option value="Inspirational">Inspirational</option>
                <option value="Educational">Educational</option>
                <option value="Casual & Friendly">Casual & Friendly</option>
                <option value="Luxury & Sophisticated">Luxury & Sophisticated</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Platforms</label>
              <select
                name="platforms"
                value={formData.platforms}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select your platforms</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram, Twitter">Instagram & Twitter</option>
                <option value="Instagram, LinkedIn">Instagram & LinkedIn</option>
                <option value="Instagram, Twitter, LinkedIn">All Platforms</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-dark-800 hover:bg-dark-600 border border-dark-600 text-gray-300 font-medium py-3 rounded-lg transition-all text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 w-full bg-primary hover:bg-primary/90 disabled:bg-dark-600 disabled:text-gray-500 text-white font-medium py-3 rounded-lg transition-all text-sm"
              >
                {loading ? 'Saving...' : 'Save Business Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;