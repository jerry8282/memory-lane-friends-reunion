import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Heart, MessageCircle } from 'lucide-react';
import { mockFriends } from '@/data/mockData';

interface Friend {
  id: number;
  nickname: string;
  year: number;
  period: string;
  location: string;
  additionalInfo: string;
  bio: string;
}

interface SearchCriteria {
  year: number;
  period: string;
  location: string;
  keywords: string[];
}

interface FriendMatchesProps {
  onBack: () => void;
  searchCriteria?: SearchCriteria;
}

const FriendMatches: React.FC<FriendMatchesProps> = ({ onBack, searchCriteria }) => {
  const [matches, setMatches] = useState<Array<Friend & { matchScore: number }>>([]);
  const [sentRequests, setSentRequests] = useState<Set<number>>(new Set());

  const calculateMatchScore = (friend: Friend, criteria: SearchCriteria): number => {
    let score = 0;
    
    // 연도 매칭 (30점)
    if (friend.year === criteria.year) {
      score += 30;
    } else {
      // 연도가 가까울수록 부분 점수 부여
      const yearDiff = Math.abs(friend.year - criteria.year);
      if (yearDiff <= 2) {
        score += Math.max(0, 30 - (yearDiff * 10));
      }
    }

    // 기간(학년) 매칭 (25점)
    if (friend.period === criteria.period) {
      score += 25;
    } else if (friend.period.includes(criteria.period) || criteria.period.includes(friend.period)) {
      score += 15; // 부분 일치
    }

    // 지역 매칭 (25점)
    const friendLocation = friend.location.split(' ');
    const criteriaLocation = criteria.location.split(' ');
    
    if (friend.location === criteria.location) {
      score += 25;
    } else {
      // 시/도가 같으면 10점
      if (friendLocation[0] === criteriaLocation[0]) {
        score += 10;
        // 구까지 같으면 추가 10점
        if (friendLocation[1] === criteriaLocation[1]) {
          score += 10;
        }
      }
    }

    // 추가 정보 키워드 매칭 (20점)
    const additionalInfoLower = friend.additionalInfo.toLowerCase();
    const bioLower = friend.bio.toLowerCase();
    let keywordMatches = 0;

    criteria.keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      if (additionalInfoLower.includes(keywordLower) || bioLower.includes(keywordLower)) {
        keywordMatches++;
      }
    });

    if (keywordMatches > 0) {
      score += Math.min(20, (keywordMatches / criteria.keywords.length) * 20);
    }

    return Math.round(score);
  };

  useEffect(() => {
    if (!searchCriteria) {
      setMatches(mockFriends.slice(0, 8).map(friend => ({ ...friend, matchScore: 70 })));
      return;
    }

    const matchedFriends = mockFriends
      .map(friend => ({
        ...friend,
        matchScore: calculateMatchScore(friend, searchCriteria)
      }))
      .filter(friend => friend.matchScore >= 40) // 최소 40점 이상인 매칭만 표시
      .sort((a, b) => b.matchScore - a.matchScore) // 매칭 점수 높은 순으로 정렬
      .slice(0, 8); // 상위 8명만 표시

    setMatches(matchedFriends);
  }, [searchCriteria]);

  const handleSendRequest = (friendId: number) => {
    setSentRequests(prev => new Set([...prev, friendId]));
    // 실제로는 서버에 요청을 보내는 로직
    console.log('친구 요청 전송:', friendId);
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
        <h2 className="text-xl font-bold text-gray-800">매칭 결과</h2>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4 mb-6">
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 mb-1">
            🎉 {matches.length}명의 친구 후보를 찾았어요!
          </h3>
          <p className="text-sm text-gray-600">
            비슷한 기억을 가진 분들이에요
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {matches.map((friend) => {
          const isRequestSent = sentRequests.has(friend.id);
          
          return (
            <Card key={friend.id} className="border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{friend.nickname}</h4>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${friend.matchScore >= 85 ? 'bg-pink-100 text-pink-600' : 'bg-purple-100 text-purple-600'}`}
                        >
                          {friend.matchScore}% 일치
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{friend.year}년 • {friend.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{friend.location}</span>
                        </div>
                        {friend.additionalInfo && (
                          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                            {friend.additionalInfo}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {isRequestSent ? (
                      <div className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 rounded-lg text-gray-600 text-sm">
                        <MessageCircle className="w-4 h-4" />
                        요청 전송됨
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleSendRequest(friend.id)}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg"
                        size="sm"
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        반갑다 친구야
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {matches.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">아직 매칭된 친구가 없어요</h3>
          <p className="text-sm text-gray-600 mb-4">
            다른 검색 조건으로 다시 시도해보세요
          </p>
          <Button 
            onClick={onBack}
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            다시 검색하기
          </Button>
        </div>
      )}

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
        <h4 className="font-semibold text-orange-700 text-sm mb-2">💡 알아두세요</h4>
        <ul className="text-xs text-orange-600 space-y-1">
          <li>• 상대방이 수락하면 채팅을 시작할 수 있어요</li>
          <li>• 매칭률이 높을수록 공통 기억이 많아요</li>
          <li>• 프로필 정보는 수락 후에 공개됩니다</li>
        </ul>
      </div>
    </div>
  );
};

export default FriendMatches;
