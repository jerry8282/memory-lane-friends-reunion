
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Heart, User, Mail, Lock, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface RegisterScreenProps {
  onBack: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  // Step 1: 기본 정보
  const [basicInfo, setBasicInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    birthYear: '',
    gender: '' as 'male' | 'female' | ''
  });

  // Step 2: 과거 기억 정보
  const [memoryInfo, setMemoryInfo] = useState({
    rememberedYears: {
      startYear: '',
      endYear: '',
      timeDescription: ''
    },
    rememberedLocation: '',
    schoolOrWork: '',
    oldNickname: ''
  });

  // Step 3: 개인정보 동의
  const [agreements, setAgreements] = useState({
    privacy: false,
    location: false,
    realName: false
  });

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (basicInfo.password !== basicInfo.confirmPassword) {
      toast({
        title: "비밀번호 확인",
        description: "비밀번호가 일치하지 않습니다.",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreements.privacy) {
      toast({
        title: "필수 동의",
        description: "개인정보 수집 및 활용에 동의해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const userData: any = {
        email: basicInfo.email,
        password: basicInfo.password,
        nickname: basicInfo.nickname,
        name: basicInfo.name,
        birthYear: parseInt(basicInfo.birthYear),
        profile: {
          rememberedYears: {
            startYear: parseInt(memoryInfo.rememberedYears.startYear),
            endYear: parseInt(memoryInfo.rememberedYears.endYear),
            timeDescription: memoryInfo.rememberedYears.timeDescription
          },
          rememberedLocation: memoryInfo.rememberedLocation,
          schoolOrWork: memoryInfo.schoolOrWork,
          oldNickname: memoryInfo.oldNickname,
          memorablePlaces: [],
          activityKeywords: []
        }
      };

      // Only include gender if it's selected
      if (basicInfo.gender && (basicInfo.gender === 'male' || basicInfo.gender === 'female')) {
        userData.gender = basicInfo.gender;
      }

      const success = await register(userData);
      if (success) {
        toast({
          title: "회원가입 완료! 🎉",
          description: "가입이 완료되었습니다! 당신의 추억을 불러오는 중이에요...",
        });
        
        // 상태 업데이트를 위해 약간의 지연 후 메인 화면으로 이동
        setTimeout(() => {
          onBack(); // 메인 화면으로 돌아가기
        }, 200); // 짧은 지연으로 상태 업데이트 보장
      } else {
        toast({
          title: "회원가입 실패",
          description: "회원가입 중 문제가 발생했습니다.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "회원가입 중 문제가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <Card className="border-purple-100 shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg text-gray-800">기본 정보를 입력해주세요</CardTitle>
        <p className="text-sm text-gray-600">Step 1 of 3</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleStep1Submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              이메일 <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={basicInfo.email}
                onChange={(e) => setBasicInfo({...basicInfo, email: e.target.value})}
                placeholder="이메일을 입력해주세요"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              비밀번호 <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={basicInfo.password}
                onChange={(e) => setBasicInfo({...basicInfo, password: e.target.value})}
                placeholder="비밀번호를 입력해주세요"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              비밀번호 확인 <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type="password"
                value={basicInfo.confirmPassword}
                onChange={(e) => setBasicInfo({...basicInfo, confirmPassword: e.target.value})}
                placeholder="비밀번호를 다시 입력해주세요"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                이름 <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  value={basicInfo.name}
                  onChange={(e) => setBasicInfo({...basicInfo, name: e.target.value})}
                  placeholder="실명"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-sm font-medium text-gray-700">
                닉네임 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nickname"
                value={basicInfo.nickname}
                onChange={(e) => setBasicInfo({...basicInfo, nickname: e.target.value})}
                placeholder="닉네임"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthYear" className="text-sm font-medium text-gray-700">
                출생년도 <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="birthYear"
                  type="number"
                  value={basicInfo.birthYear}
                  onChange={(e) => setBasicInfo({...basicInfo, birthYear: e.target.value})}
                  placeholder="1995"
                  className="pl-10"
                  min="1950"
                  max="2010"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">성별</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={basicInfo.gender === 'male' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBasicInfo({...basicInfo, gender: 'male'})}
                  className="flex-1"
                >
                  남성
                </Button>
                <Button
                  type="button"
                  variant={basicInfo.gender === 'female' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBasicInfo({...basicInfo, gender: 'female'})}
                  className="flex-1"
                >
                  여성
                </Button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            다음 단계로 ➡️
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="border-purple-100 shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg text-gray-800">과거의 기억을 알려주세요</CardTitle>
        <p className="text-sm text-gray-600">Step 2 of 3 • 친구를 찾는데 도움이 됩니다</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleStep2Submit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              친했던 시기 <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                value={memoryInfo.rememberedYears.startYear}
                onChange={(e) => setMemoryInfo({
                  ...memoryInfo,
                  rememberedYears: { ...memoryInfo.rememberedYears, startYear: e.target.value }
                })}
                placeholder="2010"
                min="1990"
                max="2024"
                required
              />
              <Input
                type="number"
                value={memoryInfo.rememberedYears.endYear}
                onChange={(e) => setMemoryInfo({
                  ...memoryInfo,
                  rememberedYears: { ...memoryInfo.rememberedYears, endYear: e.target.value }
                })}
                placeholder="2013"
                min="1990"
                max="2024"
                required
              />
            </div>
            <Input
              value={memoryInfo.rememberedYears.timeDescription}
              onChange={(e) => setMemoryInfo({
                ...memoryInfo,
                rememberedYears: { ...memoryInfo.rememberedYears, timeDescription: e.target.value }
              })}
              placeholder="예: 고등학생 때, 대학교 1학년 때"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              당시 활동 지역 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="location"
              value={memoryInfo.rememberedLocation}
              onChange={(e) => setMemoryInfo({...memoryInfo, rememberedLocation: e.target.value})}
              placeholder="예: 서울시 송파구 잠실동, 부산 해운대구"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school" className="text-sm font-medium text-gray-700">
              학교 또는 직장명
            </Label>
            <Input
              id="school"
              value={memoryInfo.schoolOrWork}
              onChange={(e) => setMemoryInfo({...memoryInfo, schoolOrWork: e.target.value})}
              placeholder="예: 잠실고등학교, 삼성전자"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="oldNickname" className="text-sm font-medium text-gray-700">
              당시 별명이나 ID
            </Label>
            <Input
              id="oldNickname"
              value={memoryInfo.oldNickname}
              onChange={(e) => setMemoryInfo({...memoryInfo, oldNickname: e.target.value})}
              placeholder="예: 작은 빛나리, 코딩왕"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              이전
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              다음 단계로 ➡️
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="border-purple-100 shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg text-gray-800">약관 동의</CardTitle>
        <p className="text-sm text-gray-600">Step 3 of 3 • 마지막 단계입니다</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
              <input
                type="checkbox"
                id="privacy"
                checked={agreements.privacy}
                onChange={(e) => setAgreements({...agreements, privacy: e.target.checked})}
                className="mt-1"
                required
              />
              <div>
                <Label htmlFor="privacy" className="text-sm font-medium text-gray-700">
                  개인정보 수집 및 활용 동의 <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  서비스 제공을 위한 최소한의 개인정보를 수집합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="location"
                checked={agreements.location}
                onChange={(e) => setAgreements({...agreements, location: e.target.checked})}
                className="mt-1"
              />
              <div>
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  위치 정보 활용 동의 (선택)
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  더 정확한 친구 매칭을 위해 위치 정보를 활용합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="realName"
                checked={agreements.realName}
                onChange={(e) => setAgreements({...agreements, realName: e.target.checked})}
                className="mt-1"
              />
              <div>
                <Label htmlFor="realName" className="text-sm font-medium text-gray-700">
                  실명 인증 (선택)
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  더 신뢰할 수 있는 만남을 위한 선택사항입니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 모든 정보는 사용자의 동의 없이 공개되지 않으며, 채팅 수락 전까지 상대방에게 노출되지 않습니다.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(2)}
              className="flex-1"
            >
              이전
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              {isLoading ? '가입 중...' : '회원가입 완료 🌸'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={step === 1 ? onBack : () => setStep(step - 1 as 1 | 2)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-bold text-gray-800">회원가입</h2>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full ${
              i <= step ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default RegisterScreen;
