
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, LogIn, UserPlus } from 'lucide-react';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

interface AuthScreenProps {
  onBack: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<'main' | 'login' | 'register' | 'forgot'>('main');

  if (currentView === 'login') {
    return (
      <LoginScreen 
        onBack={() => setCurrentView('main')}
        onForgotPassword={() => setCurrentView('forgot')}
      />
    );
  }

  if (currentView === 'register') {
    return <RegisterScreen onBack={() => setCurrentView('main')} />;
  }

  if (currentView === 'forgot') {
    return (
      <div className="space-y-6 pt-6">
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-lg text-gray-800">비밀번호 찾기</CardTitle>
            <p className="text-sm text-gray-600">등록된 이메일로 재설정 링크를 보내드릴게요</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="등록된 이메일을 입력해주세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                재설정 링크 보내기
              </Button>
              <Button variant="outline" onClick={() => setCurrentView('main')} className="w-full">
                로그인으로 돌아가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
          <Heart className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">반갑다 친구야</h2>
          <p className="text-gray-600 leading-relaxed">
            기억 속 그 친구와<br />
            다시 만날 준비가 되셨나요?
          </p>
        </div>
      </div>

      {/* Auth Options */}
      <div className="space-y-3">
        <Card className="border-purple-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentView('login')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <LogIn className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">로그인</h3>
                <p className="text-sm text-gray-600">이미 계정이 있으시다면</p>
              </div>
              <div className="text-purple-500">➡️</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-pink-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setCurrentView('register')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">회원가입</h3>
                <p className="text-sm text-gray-600">새로운 계정을 만들어보세요</p>
              </div>
              <div className="text-pink-500">➡️</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Access */}
      <div className="bg-white/60 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-600 mb-3">서비스를 먼저 둘러보고 싶으시다면</p>
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-purple-200 text-purple-600 hover:bg-purple-50"
        >
          <Users className="w-4 h-4 mr-2" />
          둘러보기
        </Button>
      </div>
    </div>
  );
};

export default AuthScreen;
