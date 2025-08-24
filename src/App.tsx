import React, { useState } from 'react';
import LoginPage from './components/Auth/LoginPage';
import SignUpPage from './components/Auth/SignUpPage';
import NameInput from './components/Auth/NameInput';
import Dashboard from './components/Dashboard/Dashboard';
import GameModes from './components/Game/GameModes';
import QuestionScreen from './components/Game/QuestionScreen';
import MatchSimulation from './components/Game/MatchSimulation';
import LeaderboardPage from './components/Leaderboard/LeaderboardPage';
import ProfilePage from './components/Profile/ProfilePage';
import RewardCenter from './components/Rewards/RewardCenter';

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  rank: string;
  xp: number;
  coins: number;
  avatar: string;
  totalMatches: number;
  wins: number;
  winRate: number;
}

export type Screen = 'login' | 'signup' | 'name-input' | 'dashboard' | 'game-modes' | 'question' | 'match-simulation' | 'leaderboard' | 'profile' | 'rewards';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedGameMode, setSelectedGameMode] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, this would authenticate with backend
    setCurrentScreen('name-input');
  };

  const handleSignUp = (email: string, username: string, password: string) => {
    // Mock signup
    setCurrentScreen('name-input');
  };

  const handleNameSubmit = (displayName: string) => {
    const newUser: User = {
      id: '1',
      username: 'player1',
      email: 'player@example.com',
      displayName,
      rank: 'Bronze',
      xp: 150,
      coins: 250,
      avatar: '🎮',
      totalMatches: 15,
      wins: 12,
      winRate: 80
    };
    setUser(newUser);
    setCurrentScreen('dashboard');
  };

  const handleStartGame = (mode: string, subjects: string[]) => {
    setSelectedGameMode(mode);
    setSelectedSubjects(subjects);
    setCurrentScreen('match-simulation');
  };

  const handleGameComplete = (coinsEarned: number, xpEarned: number) => {
    if (user) {
      setUser({
        ...user,
        coins: user.coins + coinsEarned,
        xp: user.xp + xpEarned,
        totalMatches: user.totalMatches + 1,
        wins: user.wins + 1
      });
    }
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onSwitchToSignUp={() => setCurrentScreen('signup')}
          />
        );
      case 'signup':
        return (
          <SignUpPage
            onSignUp={handleSignUp}
            onSwitchToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'name-input':
        return <NameInput onSubmit={handleNameSubmit} />;
      case 'dashboard':
        return (
          <Dashboard
            user={user!}
            onNavigate={setCurrentScreen}
            onStartGame={() => setCurrentScreen('game-modes')}
          />
        );
      case 'game-modes':
        return (
          <GameModes
            onBack={() => setCurrentScreen('dashboard')}
            onStartGame={handleStartGame}
          />
        );
      case 'question':
        return (
          <QuestionScreen
            gameMode={selectedGameMode}
            subjects={selectedSubjects}
            onBack={() => setCurrentScreen('game-modes')}
            onGameComplete={handleGameComplete}
          />
        );
      case 'match-simulation':
        return (
          <MatchSimulation
            user={user!}
            gameMode={selectedGameMode}
            subjects={selectedSubjects}
            onGameStart={() => setCurrentScreen('question')}
            onBack={() => setCurrentScreen('game-modes')}
          />
        );
      case 'leaderboard':
        return (
          <LeaderboardPage
            currentUser={user!}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            user={user!}
            onBack={() => setCurrentScreen('dashboard')}
            onUpdateUser={setUser}
          />
        );
      case 'rewards':
        return (
          <RewardCenter
            user={user!}
            onBack={() => setCurrentScreen('dashboard')}
            onUpdateUser={setUser}
          />
        );
      default:
        return <LoginPage onLogin={handleLogin} onSwitchToSignUp={() => setCurrentScreen('signup')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {renderScreen()}
    </div>
  );
}

export default App;