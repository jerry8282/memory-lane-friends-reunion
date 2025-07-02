
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, User, Calendar, Mail, Shield, MapPin, Heart, Camera } from 'lucide-react';

interface ProfileSetupProps {
  onBack: () => void;
  profile: any;
  onSave: (profile: any) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onBack, profile, onSave }) => {
  const [formData, setFormData] = useState({
    // 기본 정보
    name: profile?.name || '',
    nickname: profile?.nickname || '',
    birthYear: profile?.birthYear || '',
    birthMonth: profile?.birthMonth || '',
    birthDay: profile?.birthDay || '',
    gender: profile?.gender || '',
    email: profile?.email || '',
    
    // 추가 프로필 정보
    currentLocation: profile?.currentLocation || '',
    oldNickname: profile?.oldNickname || '',
    memorablePlaces: profile?.memorablePlaces || ['', '', ''],
    activityKeywords: profile?.activityKeywords || '',
    bio: profile?.bio || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 빈 장소들 필터링
    const filteredPlaces = formData.memorablePlaces.filter(place => place.trim() !== '');
    const profileData = {
      ...formData,
      memorablePlaces: filteredPlaces
    };
    
    onSave(profileData);
    console.log('프로필 저장:', profileData);
  };

  const handlePlaceChange = (index: number, value: string) => {
    const newPlaces = [...formData.memorablePlaces];
    newPlaces[index] = value;
    setFormData({...formData, memorablePlaces: newPlaces});
  };

  const isFormValid = formData.name && formData.nickname && formData.birthYear;

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

      {/* 프라이버시 안내 */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-700 text-sm mb-1">프라이버시 보호</h3>
            <p className="text-xs text-purple-600 leading-relaxed">
              입력하신 모든 정보는 친구 요청 수락 전까지 안전하게 보호됩니다. 
              닉네임과 간략한 매칭 정보만 다른 사용자에게 공개돼요.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <Card className="border-purple-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              기본 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name" className="text-sm text-gray-600">이름 *</Label>
                <Input
                  id="name"
                  placeholder="실명 또는 본명"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1"
                  required
                />
              </div>
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
            </div>

            <div>
              <Label className="text-sm text-gray-600">생년월일 *</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Input
                  placeholder="1998"
                  value={formData.birthYear}
                  onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                  required
                />
                <Input
                  placeholder="12"
                  value={formData.birthMonth}
                  onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
                />
                <Input
                  placeholder="25"
                  value={formData.birthDay}
                  onChange={(e) => setFormData({...formData, birthDay: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="gender" className="text-sm text-gray-600">성별 (선택)</Label>
              <div className="flex gap-3 mt-2">
                <Button
                  type="button"
                  variant={formData.gender === '남성' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormData({...formData, gender: '남성'})}
                  className="flex-1"
                >
                  남성
                </Button>
                <Button
                  type="button"
                  variant={formData.gender === '여성' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormData({...formData, gender: '여성'})}
                  className="flex-1"
                >
                  여성
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 연락처 정보 */}
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
            <div>
              <Label htmlFor="currentLocation" className="text-sm text-gray-600">현재 주 사용 지역 (선택)</Label>
              <Input
                id="currentLocation"
                placeholder="예: 서울 강남구, 경기도 성남시"
                value={formData.currentLocation}
                onChange={(e) => setFormData({...formData, currentLocation: e.target.value})}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                대략적인 현재 거주지나 활동 지역
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 기억 기반 정보 */}
        <Card className="border-orange-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Heart className="w-4 h-4 text-orange-500" />
              기억 속 정보 (인연 탐색 정확도 향상)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="oldNickname" className="text-sm text-gray-600">기억 속 별명이나 불렸던 이름 (선택)</Label>
              <Input
                id="oldNickname"
                placeholder="예: 작은 빛나리, 뚱이, 안경쟁이"
                value={formData.oldNickname}
                onChange={(e) => setFormData({...formData, oldNickname: e.target.value})}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                친구들이 부르던 별명이나 애칭
              </p>
            </div>

            <div>
              <Label className="text-sm text-gray-600">기억하고 있는 대표 장소 (최대 3개, 선택)</Label>
              <div className="space-y-2 mt-1">
                {formData.memorablePlaces.map((place, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <Input
                      placeholder={`장소 ${index + 1}: 예) OO고등학교, 군부대, OO학원`}
                      value={place}
                      onChange={(e) => handlePlaceChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                학교, 학원, 군부대, 직장 등 추억이 담긴 장소들
              </p>
            </div>

            <div>
              <Label htmlFor="activityKeywords" className="text-sm text-gray-600">기억 속 활동 키워드 (선택)</Label>
              <Input
                id="activityKeywords"
                placeholder="예: 농구부, 밴드부, 자율학습, 야자, 아르바이트"
                value={formData.activityKeywords}
                onChange={(e) => setFormData({...formData, activityKeywords: e.target.value})}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                동아리, 활동, 취미 등을 쉼표로 구분해서 입력해주세요
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 자기소개 */}
        <Card className="border-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700">자기소개 (선택사항)</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="bio" className="text-sm text-gray-600">간단한 소개</Label>
              <Textarea
                id="bio"
                placeholder="예: IT 개발자예요. 음악 듣기와 영화 보기를 좋아합니다. 옛 친구들과의 추억을 소중히 생각해요."
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="mt-1 min-h-[80px]"
              />
              <p className="text-xs text-gray-500 mt-1">
                친구 요청 수락 후 상대방에게 공개됩니다
              </p>
            </div>
          </CardContent>
        </Card>

        <Button 
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg"
          disabled={!isFormValid}
        >
          프로필 저장하기
        </Button>

        {/* 내 기억 카드 미리보기 */}
        {(formData.name || formData.nickname) && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
              <Camera className="w-4 h-4 text-purple-500" />
              내 기억 카드 미리보기
            </h4>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-800">
                  {formData.nickname || '닉네임'} 
                  {formData.birthYear && ` (${new Date().getFullYear() - parseInt(formData.birthYear)}세)`}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {formData.memorablePlaces.filter(p => p).length > 0 && (
                    <div>{formData.memorablePlaces.filter(p => p).join(' | ')}</div>
                  )}
                  {formData.oldNickname && (
                    <div className="text-purple-600">'{formData.oldNickname}'로 불렸어요</div>
                  )}
                  {formData.currentLocation && (
                    <div className="text-gray-500">{formData.currentLocation} 활동</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* 이용 통계 */}
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
