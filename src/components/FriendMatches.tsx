
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Heart, MessageCircle } from 'lucide-react';
import { mockFriends } from '@/data/mockData';

interface FriendMatchesProps {
  onBack: () => void;
}

const FriendMatches: React.FC<FriendMatchesProps> = ({ onBack }) => {
  const [matches, setMatches] = useState<any[]>([]);
  const [sentRequests, setSentRequests] = useState<Set<number>>(new Set());

  useEffect(() => {
    // 실제로는 검색 조건에 맞는 매칭 로직이 들어갈 곳
    setMatches(mockFriends.slice(0, 8));
  }, []);

  const handleSendRequest = (friendId: number) => {
    setSentRequests(prev => new Set([...prev, friendId]));
    // 실제로는 서버에 요청을 보내는 로직
    console.log('친구 요청 전송:', friendId);
  };

  const getMatchPercentage = (friend: any) => {
    // 간단한 매칭 점수 계산 (실제로는 더 복잡한 로직)
    return Math.floor(Math.random() * 30) + 70;
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
          const matchPercentage = getMatchPercentage(friend);
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
                          className={`text-xs ${matchPercentage >= 85 ? 'bg-pink-100 text-pink-600' : 'bg-purple-100 text-purple-600'}`}
                        >
                          {matchPercentage}% 일치
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
