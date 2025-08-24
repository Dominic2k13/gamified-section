import React, { useState } from 'react';
import { User } from 'lucide-react';

interface NameInputProps {
  onSubmit: (displayName: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onSubmit }) => {
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (displayName.trim()) {
      onSubmit(displayName.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">What's your name?</h1>
          <p className="text-gray-300">This will be displayed in games and leaderboards</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your display name"
              required
              maxLength={20}
            />
            <p className="text-xs text-gray-400 mt-1">
              {displayName.length}/20 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={!displayName.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameInput;