import React, { useState } from 'react';
import { ArrowLeft, Trophy, Medal, Crown, Star, Filter, Calendar, Globe } from 'lucide-react';
import type { User } from '../../App';
import RankBadge from '../Common/RankBadge';

interface LeaderboardPageProps {
  currentUser: User;
  onBack: () => void;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ currentUser, onBack }) => {
  const [activeTab, setActiveTab] = useState<'global' | 'subject'>('global');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'all-time'>('all-time');

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];

  // Mock leaderboard data
  const globalLeaderboard = [
    { rank: 1, name: 'Alex Chen', avatar: '👑', rankTitle: 'Legend', score: 12450, xp: 15600 },
    { rank: 2, name: 'Sarah Johnson', avatar: '💎', rankTitle: 'Grandmaster', score: 11200, xp: 14200 },
    { rank: 3, name: 'Mike Rodriguez', avatar: '🌟', rankTitle: 'Master', score: 9850, xp: 12800 },
    { rank: 4, name: 'Emma Wilson', avatar: '⚡', rankTitle: 'Diamond', score: 8900, xp: 11500 },
    { rank: 5, name: 'David Kim', avatar: '🔥', rankTitle: 'Platinum', score: 8200, xp: 10800 },
    { rank: 6, name: 'Lisa Brown', avatar: '✨', rankTitle: 'Gold', score: 7500, xp: 9900 },
    { rank: 7, name: 'John Smith', avatar: '🎯', rankTitle: 'Silver', score: 6800, xp: 8700 },
    { rank: 8, name: 'Maria Garcia', avatar: '🚀', rankTitle: 'Bronze', score: 5900, xp: 7500 },
    { rank: 12, name: currentUser.displayName, avatar: currentUser.avatar, rankTitle: currentUser.rank, score: 4200, xp: currentUser.xp },
  ];

  const subjectLeaderboards = {
    Mathematics: [
      { rank: 1, name: 'Emma Wilson', avatar: '⚡', rankTitle: 'Diamond', score: 2450, xp: 3200 },
      { rank: 2, name: 'Alex Chen', avatar: '👑', rankTitle: 'Legend', score: 2300, xp: 3000 },
      { rank: 3, name: 'David Kim', avatar: '🔥', rankTitle: 'Platinum', score: 2100, xp: 2800 },
      { rank: 5, name: currentUser.displayName, avatar: currentUser.avatar, rankTitle: currentUser.rank, score: 1800, xp: currentUser.xp },
    ],
    Physics: [
      { rank: 1, name: 'Sarah Johnson', avatar: '💎', rankTitle: 'Grandmaster', score: 2200, xp: 2900 },
      { rank: 2, name: 'Mike Rodriguez', avatar: '🌟', rankTitle: 'Master', score: 2050, xp: 2700 },
      { rank: 3, name: 'Lisa Brown', avatar: '✨', rankTitle: 'Gold', score: 1900, xp: 2500 },
      { rank: 8, name: currentUser.displayName, avatar: currentUser.avatar, rankTitle: currentUser.rank, score: 1200, xp: currentUser.xp },
    ]
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Trophy className="w-6 h-6 text-orange-400" />;
      default: return <Star className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRowClass = (player: any) => {
    const isCurrentUser = player.name === currentUser.displayName;
    const baseClass = "p-4 rounded-lg transition-all duration-200 border";
    
    if (isCurrentUser) {
      return `${baseClass} border-purple-400 bg-purple-500/20 shadow-lg`;
    }
    
    if (player.rank <= 3) {
      return `${baseClass} border-yellow-400/50 bg-yellow-500/10 hover:bg-yellow-500/20`;
    }
    
    return `${baseClass} border-white/10 bg-white/5 hover:bg-white/10`;
  };

  const currentLeaderboard = activeTab === 'global' 
    ? globalLeaderboard 
    : (subjectLeaderboards as any)[selectedSubject] || [];

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
          <div></div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Tab Selection */}
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('global')}
                className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === 'global'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Global</span>
              </button>
              <button
                onClick={() => setActiveTab('subject')}
                className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === 'subject'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Subject</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Subject Selection */}
              {activeTab === 'subject' && (
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject} className="bg-gray-800 text-white">
                      {subject}
                    </option>
                  ))}
                </select>
              )}

              {/* Time Filter */}
              <div className="flex bg-white/10 rounded-lg p-1">
                {['daily', 'weekly', 'all-time'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter as any)}
                    className={`px-3 py-1 rounded text-sm transition-all duration-200 flex items-center space-x-1 ${
                      timeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>{filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Podium - Top 3 */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Top 3 Champions</h2>
          <div className="flex justify-center items-end space-x-8">
            {/* 2nd Place */}
            {currentLeaderboard[1] && (
              <div className="text-center transform hover:scale-105 transition-all duration-200">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-lg">
                  {currentLeaderboard[1].avatar}
                </div>
                <RankBadge rank={currentLeaderboard[1].rankTitle} size="sm" />
                <p className="font-bold text-white mt-2">{currentLeaderboard[1].name}</p>
                <p className="text-yellow-400 font-bold">{currentLeaderboard[1].score.toLocaleString()}</p>
                <div className="w-16 h-24 bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-lg mt-2"></div>
              </div>
            )}

            {/* 1st Place */}
            {currentLeaderboard[0] && (
              <div className="text-center transform hover:scale-105 transition-all duration-200">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl mb-3 shadow-2xl">
                  {currentLeaderboard[0].avatar}
                </div>
                <RankBadge rank={currentLeaderboard[0].rankTitle} size="md" />
                <p className="font-bold text-white mt-2 text-lg">{currentLeaderboard[0].name}</p>
                <p className="text-yellow-400 font-bold text-xl">{currentLeaderboard[0].score.toLocaleString()}</p>
                <div className="w-20 h-32 bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-lg mt-2"></div>
              </div>
            )}

            {/* 3rd Place */}
            {currentLeaderboard[2] && (
              <div className="text-center transform hover:scale-105 transition-all duration-200">
                <div className="w-18 h-18 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-xl mb-3 shadow-lg">
                  {currentLeaderboard[2].avatar}
                </div>
                <RankBadge rank={currentLeaderboard[2].rankTitle} size="sm" />
                <p className="font-bold text-white mt-2">{currentLeaderboard[2].name}</p>
                <p className="text-yellow-400 font-bold">{currentLeaderboard[2].score.toLocaleString()}</p>
                <div className="w-14 h-20 bg-gradient-to-t from-orange-600 to-orange-500 rounded-t-lg mt-2"></div>
              </div>
            )}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">Full Rankings</h2>
          <div className="space-y-3">
            {currentLeaderboard.map((player, index) => (
              <div key={index} className={getRowClass(player)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(player.rank)}
                      <span className="text-white font-bold ml-2">#{player.rank}</span>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-xl shadow-lg">
                      {player.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <p className="font-bold text-white">{player.name}</p>
                        {player.name === currentUser.displayName && (
                          <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded text-xs">You</span>
                        )}
                      </div>
                      <RankBadge rank={player.rankTitle} size="sm" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold text-lg">{player.score.toLocaleString()}</p>
                    <p className="text-gray-300 text-sm">{player.xp.toLocaleString()} XP</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;