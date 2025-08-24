import React, { useState } from 'react';
import { ArrowLeft, User, Trophy, Target, Zap, Edit2, Save, X, Medal, Star, Award } from 'lucide-react';
import type { User as UserType } from '../../App';
import RankBadge from '../Common/RankBadge';

interface ProfilePageProps {
  user: UserType;
  onBack: () => void;
  onUpdateUser: (user: UserType) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onBack, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'rewards' | 'achievements'>('stats');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user.displayName,
    avatar: user.avatar
  });

  const handleSaveProfile = () => {
    onUpdateUser({
      ...user,
      displayName: editForm.displayName,
      avatar: editForm.avatar
    });
    setIsEditing(false);
  };

  const achievements = [
    { 
      id: 1,
      title: 'First Steps',
      description: 'Complete your first quiz',
      icon: '🎯',
      earned: true,
      earnedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Math Whiz',
      description: 'Score 100% in 5 Math quizzes',
      icon: '📊',
      earned: true,
      earnedDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'Streak Master',
      description: 'Maintain a 10-question streak',
      icon: '🔥',
      earned: true,
      earnedDate: '2024-01-25'
    },
    {
      id: 4,
      title: 'Speed Demon',
      description: 'Answer 20 questions in under 5 seconds each',
      icon: '⚡',
      earned: false,
      earnedDate: null
    },
    {
      id: 5,
      title: 'Subject Master',
      description: 'Reach Gold rank in any subject',
      icon: '🏆',
      earned: false,
      earnedDate: null
    },
    {
      id: 6,
      title: 'Perfectionist',
      description: 'Score 100% in 10 consecutive quizzes',
      icon: '💎',
      earned: false,
      earnedDate: null
    }
  ];

  const recentRewards = [
    { type: 'coins', amount: 150, reason: 'Quiz completion bonus', date: '2024-01-25' },
    { type: 'xp', amount: 200, reason: 'Perfect score achievement', date: '2024-01-24' },
    { type: 'coins', amount: 75, reason: 'Daily login bonus', date: '2024-01-23' },
    { type: 'xp', amount: 180, reason: 'Streak bonus', date: '2024-01-22' },
    { type: 'coins', amount: 100, reason: 'First place in daily challenge', date: '2024-01-21' }
  ];

  const stats = [
    { label: 'Total Questions Answered', value: 1247, icon: Target },
    { label: 'Average Score', value: '87%', icon: Trophy },
    { label: 'Best Streak', value: 23, icon: Zap },
    { label: 'Hours Played', value: 45, icon: User },
    { label: 'Subjects Mastered', value: 3, icon: Star },
    { label: 'Achievements Earned', value: achievements.filter(a => a.earned).length, icon: Award }
  ];

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
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <div></div>
        </div>

        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar & Basic Info */}
            <div className="text-center md:text-left">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-2xl mx-auto md:mx-0">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.avatar}
                    onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
                    className="w-12 h-12 bg-transparent text-center text-2xl outline-none"
                    maxLength={2}
                  />
                ) : (
                  user.avatar
                )}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.displayName}
                  onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
                  className="text-2xl font-bold text-white bg-transparent border-b-2 border-purple-400 outline-none text-center md:text-left mb-2"
                  maxLength={20}
                />
              ) : (
                <h2 className="text-2xl font-bold text-white mb-2">{user.displayName}</h2>
              )}
              <p className="text-gray-300 mb-4">@{user.username}</p>
              <RankBadge rank={user.rank} size="lg" />
            </div>

            {/* Quick Stats */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">{user.coins.toLocaleString()}</p>
                <p className="text-gray-300 text-sm">Coins</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{user.xp.toLocaleString()}</p>
                <p className="text-gray-300 text-sm">XP</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{user.winRate}%</p>
                <p className="text-gray-300 text-sm">Win Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{user.totalMatches}</p>
                <p className="text-gray-300 text-sm">Matches</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">{user.wins}</p>
                <p className="text-gray-300 text-sm">Wins</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-400">12</p>
                <p className="text-gray-300 text-sm">Rank</p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm({ displayName: user.displayName, avatar: user.avatar });
                    }}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 mb-6 border border-white/20">
          <div className="flex space-x-1">
            {[
              { id: 'stats', label: 'Statistics', icon: Target },
              { id: 'rewards', label: 'Rewards', icon: Trophy },
              { id: 'achievements', label: 'Achievements', icon: Medal }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          {activeTab === 'stats' && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Detailed Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="bg-white/10 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-200">
                      <IconComponent className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
                      <p className="text-gray-300 text-sm">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Recent Rewards</h3>
              <div className="space-y-4">
                {recentRewards.map((reward, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        reward.type === 'coins' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {reward.type === 'coins' ? '🪙' : '⚡'}
                      </div>
                      <div>
                        <p className="text-white font-medium">{reward.reason}</p>
                        <p className="text-gray-300 text-sm">{reward.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        reward.type === 'coins' ? 'text-yellow-400' : 'text-purple-400'
                      }`}>
                        +{reward.amount} {reward.type.toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                    achievement.earned
                      ? 'border-yellow-400/50 bg-yellow-500/10'
                      : 'border-gray-500/50 bg-gray-500/10'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        achievement.earned ? 'bg-yellow-500/20' : 'bg-gray-500/20'
                      }`}>
                        {achievement.earned ? achievement.icon : '🔒'}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold mb-1 ${achievement.earned ? 'text-yellow-100' : 'text-gray-400'}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm mb-2 ${achievement.earned ? 'text-yellow-200' : 'text-gray-500'}`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.earnedDate && (
                          <p className="text-xs text-yellow-400">Earned on {achievement.earnedDate}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;