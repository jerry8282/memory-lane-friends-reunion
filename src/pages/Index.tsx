
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, MapPin, Clock, Users, LogOut } from 'lucide-react';
import MemorySearch from '@/components/MemorySearch';
import FriendMatches from '@/components/FriendMatches';
import ProfileSetup from '@/components/ProfileSetup';
import AuthScreen from '@/components/AuthScreen';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'matches' | 'profile' | 'auth'>('home');
  const { user, logout, isAuthenticated } = useAuth();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setCurrentView('auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-purple-100 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-purple-500" />
              <h1 className="text-lg font-bold text-gray-800">반갑다 친구야</h1>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <>
                  <span className="text-sm text-gray-600">안녕하세요, {user?.nickname}님</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setCurrentView('profile')}
                    className="text-purple-600"
                  >
                    프로필
                  </Button>
                </>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleAuthAction}
                className={isAuthenticated ? "text-red-600" : "text-purple-600"}
              >
                {isAuthenticated ? <LogOut className="w-4 h-4" /> : '로그인'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pb-6">
        {currentView === 'auth' && (
          <AuthScreen onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'home' && (
          <div className="space-y-6 pt-6">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {isAuthenticated ? `${user?.nickname}님, 그때 그 친구를 찾아보세요` : '그때 그 친구를 찾아보세요'}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  기억 속 장소와 시간만으로<br />
                  잊지 못한 친구와 다시 만나보세요
                </p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-3">
              <Card className="border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">장소로 기억하기</h3>
                      <p className="text-sm text-gray-600">학교, 학원, 동네 이름으로 검색</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">시간으로 기억하기</h3>
                      <p className="text-sm text-gray-600">함께했던 년도, 학년으로 검색</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <Button 
              onClick={() => isAuthenticated ? setCurrentView('search') : setCurrentView('auth')}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {isAuthenticated ? '친구 찾기 시작하기 🌸' : '로그인하고 친구 찾기 🌸'}
            </Button>

            {/* Stats */}
            <div className="bg-white/60 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">이미 많은 분들이 친구를 찾고 있어요</p>
              <div className="flex justify-center gap-6">
                <div>
                  <div className="text-lg font-bold text-purple-600">127</div>
                  <div className="text-xs text-gray-500">등록된 기억</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-pink-600">43</div>
                  <div className="text-xs text-gray-500">성공한 만남</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'search' && (
          <MemorySearch 
            onBack={() => setCurrentView('home')}
            onSearchComplete={() => setCurrentView('matches')}
          />
        )}

        {currentView === 'matches' && (
          <FriendMatches 
            onBack={() => setCurrentView('search')}
          />
        )}

        {currentView === 'profile' && (
          <ProfileSetup 
            onBack={() => setCurrentView('home')}
            profile={user?.profile || null}
            onSave={(profile) => {
              // 프로필 업데이트 로직은 이미 ProfileSetup 컴포넌트에서 처리됨
              setCurrentView('home');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
