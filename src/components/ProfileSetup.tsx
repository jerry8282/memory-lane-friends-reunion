
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Calendar, Mail, Shield } from 'lucide-react';

interface ProfileSetupProps {
  onBack: () => void;
  profile: any;
  onSave: (profile: any) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onBack, profile, onSave }) => {
  const [formData, setFormData] = useState({
    nickname: profile?.nickname || '',
    birthYear: profile?.birthYear || '',
    email: profile?.email || '',
    bio: profile?.bio || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    console.log('프로필 저장:', formData);
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-bold text-gray-800">프로필 설정</h2>
      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-700 text-sm mb-1">프라이버시 보호</h3>
            <p className="text-xs text-purple-600 leading-relaxed">
              닉네임과 출생년도만 다른 사용자에게 공개됩니다. 
              연결 수락 전까지 개인정보는 안전하게 보호돼요.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-purple-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              기본 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nickname" className="text-sm text-gray-600">닉네임 *</Label>
              <Input
                id="nickname"
                placeholder="다른 사용자에게 보여질 이름"
                value={formData.nickname}
                onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="birthYear" className="text-sm text-gray-600">출생년도 *</Label>
              <Input
                id="birthYear"
                type="number"
                placeholder="1998"
                value={formData.birthYear}
                onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                className="mt-1"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-pink-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-500" />
              연락처 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm text-gray-600">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                친구 요청 알림을 받으실 수 있어요 (선택사항)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700">자기소개 (선택사항)</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="bio" className="text-sm text-gray-600">간단한 소개</Label>
              <Input
                id="bio"
                placeholder="예: IT 개발자, 음악 좋아해요"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                연결 수락 후 상대방에게 공개됩니다
              </p>
            </div>
          </CardContent>
        </Card>

        <Button 
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg"
          disabled={!formData.nickname || !formData.birthYear}
        >
          프로필 저장하기
        </Button>
      </form>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h4 className="font-semibold text-gray-700 text-sm">이용 통계</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-600">3</div>
            <div className="text-xs text-purple-500">보낸 요청</div>
          </div>
          <div className="bg-pink-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-pink-600">1</div>
            <div className="text-xs text-pink-500">받은 요청</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
