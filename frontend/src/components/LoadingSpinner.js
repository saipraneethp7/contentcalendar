import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-dark-600 border-t-primary rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;