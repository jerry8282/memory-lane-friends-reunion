
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Search, MapPin, Calendar, GraduationCap } from 'lucide-react';

interface MemorySearchProps {
  onBack: () => void;
  onSearchComplete: () => void;
}

const MemorySearch: React.FC<MemorySearchProps> = ({ onBack, onSearchComplete }) => {
  const [searchData, setSearchData] = useState({
    year: '',
    period: '',
    location: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('검색 데이터:', searchData);
    onSearchComplete();
  };

  const periodOptions = [
    '초등학교 저학년 (1-3학년)',
    '초등학교 고학년 (4-6학년)', 
    '중학교 1학년',
    '중학교 2학년',
    '중학교 3학년',
    '고등학교 1학년',
    '고등학교 2학년',
    '고등학교 3학년',
    '대학교 1학년',
    '대학교 2학년',
    '대학교 3학년',
    '대학교 4학년',
    '직장 초년차',
    '기타'
  ];

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
        <h2 className="text-xl font-bold text-gray-800">기억 속 친구 찾기</h2>
      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6">
        <p className="text-sm text-purple-700 text-center">
          💭 그때 그 친구와 함께했던<br />
          <span className="font-semibold">시간과 장소</span>를 떠올려보세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-purple-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              언제 함께했나요?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="year" className="text-sm text-gray-600">년도 (예: 2015)</Label>
              <Input
                id="year"
                type="number"
                placeholder="2015"
                value={searchData.year}
                onChange={(e) => setSearchData({...searchData, year: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="period" className="text-sm text-gray-600">시기</Label>
              <select
                id="period"
                value={searchData.period}
                onChange={(e) => setSearchData({...searchData, period: e.target.value})}
                className="w-full mt-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">선택해주세요</option>
                {periodOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-pink-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pink-500" />
              어디서 만났나요?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="location" className="text-sm text-gray-600">장소 (학교명, 동네명 등)</Label>
              <Input
                id="location"
                placeholder="예: 압구정초등학교, 유성구 학원가, 강남역 근처"
                value={searchData.location}
                onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="additionalInfo" className="text-sm text-gray-600">추가 기억 (선택사항)</Label>
              <Input
                id="additionalInfo"
                placeholder="예: 같은 반, 동아리, 학원 등"
                value={searchData.additionalInfo}
                onChange={(e) => setSearchData({...searchData, additionalInfo: e.target.value})}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg"
          disabled={!searchData.year || !searchData.location}
        >
          <Search className="w-4 h-4 mr-2" />
          친구 찾기
        </Button>
      </form>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-orange-500 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-700 text-sm mb-1">검색 팁</h4>
            <p className="text-xs text-orange-600 leading-relaxed">
              정확한 학교명보다는 지역명으로 검색하면 더 많은 친구를 찾을 수 있어요. 
              예: "○○초등학교" → "○○동", "○○구"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemorySearch;
