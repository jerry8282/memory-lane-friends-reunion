
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, MessageCircle, Calendar, MapPin, X, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface FriendRequest {
  id: number;
  nickname: string;
  year: string;
  location: string;
  schoolOrWork?: string;
  oldNickname?: string;
  additionalInfo?: string;
  sentAt: string;
}

interface ReceivedRequestsProps {
  onBack: () => void;
  onStartChat: (friendId: number, friendInfo: FriendRequest) => void;
}

const ReceivedRequests: React.FC<ReceivedRequestsProps> = ({ onBack, onStartChat }) => {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<Set<number>>(new Set());
  const [blockedRequests, setBlockedRequests] = useState<Set<number>>(new Set());
  const [skippedRequests, setSkippedRequests] = useState<Set<number>>(new Set());
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // 목업 데이터 로드
    const mockRequests: FriendRequest[] = [
      {
        id: 1,
        nickname: '작고 소중한 수현이',
        year: '2011~2013',
        location: '대전 둔산동',
        schoolOrWork: 'OO여중',
        oldNickname: '수댕이',
        additionalInfo: '농구부에서 활동했어요',
        sentAt: '2024-01-15'
      },
      {
        id: 2,
        nickname: '반짝이는 민준',
        year: '2013~2015',
        location: '부산 광안리',
        schoolOrWork: 'OO고등학교',
        oldNickname: '민짱',
        additionalInfo: '밴드부 베이스 담당',
        sentAt: '2024-01-14'
      },
      {
        id: 3,
        nickname: '조용한 지은이',
        year: '2012~2014',
        location: '서울 강남구',
        schoolOrWork: 'OO학원',
        oldNickname: '책벌레',
        additionalInfo: '야자 때 같이 공부했어요',
        sentAt: '2024-01-13'
      },
      {
        id: 4,
        nickname: '웃음많은 태환',
        year: '2014~2016',
        location: '인천 송도',
        schoolOrWork: 'OO대학교',
        oldNickname: '개그맨',
        additionalInfo: '학생회에서 활동',
        sentAt: '2024-01-12'
      },
      {
        id: 5,
        nickname: '성실한 예린',
        year: '2010~2012',
        location: '광주 서구',
        schoolOrWork: 'OO중학교',
        oldNickname: '예쁜이',
        additionalInfo: '합창부 소프라노',
        sentAt: '2024-01-11'
      }
    ];

    setRequests(mockRequests);
  }, []);

  const handleAcceptRequest = (request: FriendRequest) => {
    setAcceptedRequests(prev => new Set([...prev, request.id]));
    
    toast({
      title: "🎉 인연이 연결되었어요!",
      description: `${request.nickname}님과의 채팅을 시작할 수 있어요`,
    });

    setTimeout(() => {
      toast({
        title: "📱 상대방에게 알림 전송",
        description: `${request.nickname}님에게 수락 알림을 보냈어요`,
      });
    }, 1000);

    setTimeout(() => {
      onStartChat(request.id, request);
    }, 2000);
  };

  const handleBlockRequest = (requestId: number, nickname: string) => {
    setBlockedRequests(prev => new Set([...prev, requestId]));
    toast({
      title: "🚫 차단 완료",
      description: `${nickname}님을 차단했습니다`,
    });
  };

  const handleSkipRequest = (requestId: number, nickname: string) => {
    setSkippedRequests(prev => new Set([...prev, requestId]));
    toast({
      title: "👋 넘기기 완료",
      description: `${nickname}님의 요청을 넘겼습니다`,
    });
  };

  const visibleRequests = requests.filter(req => 
    !blockedRequests.has(req.id) && !skippedRequests.has(req.id)
  );

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
        <h2 className="text-xl font-bold text-gray-800">받은 인연 요청</h2>
      </div>

      {visibleRequests.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4 mb-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-1">
              💌 {visibleRequests.length}개의 인연 요청이 왔어요!
            </h3>
            <p className="text-sm text-gray-600">
              같은 기억을 가진 분들이 연락을 기다리고 있어요
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {visibleRequests.map((request) => {
          const isAccepted = acceptedRequests.has(request.id);
          
          return (
            <Card key={request.id} className="border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{request.nickname}</h4>
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-600">
                          새 요청
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{request.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{request.location}</span>
                        </div>
                        {request.schoolOrWork && (
                          <div className="text-xs text-purple-600 font-medium">
                            📚 {request.schoolOrWork}
                          </div>
                        )}
                        {request.oldNickname && (
                          <div className="text-xs text-pink-600 bg-pink-50 px-2 py-1 rounded">
                            💭 "{request.oldNickname}"로 불렸던 기억
                          </div>
                        )}
                        {request.additionalInfo && (
                          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                            {request.additionalInfo}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {isAccepted ? (
                      <div className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-100 rounded-lg text-green-700 text-sm">
                        <MessageCircle className="w-4 h-4" />
                        인연 연결됨 - 채팅 시작!
                      </div>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleAcceptRequest(request)}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg"
                          size="sm"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          👋 반갑다 친구야
                        </Button>
                        <Button
                          onClick={() => handleSkipRequest(request.id, request.nickname)}
                          variant="outline"
                          size="sm"
                          className="px-3 border-gray-200 text-gray-500 hover:bg-gray-50"
                          title="넘기기 - 관심 없는 요청"
                        >
                          <EyeOff className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleBlockRequest(request.id, request.nickname)}
                          variant="outline"
                          size="sm"
                          className="px-3 border-red-200 text-red-500 hover:bg-red-50"
                          title="🚫 차단하기 - 완전히 차단"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {visibleRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">받은 요청이 없어요</h3>
          <p className="text-sm text-gray-600 mb-4">
            아직 아무도 인연 요청을 보내지 않았어요
          </p>
          <Button 
            onClick={onBack}
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            뒤로 가기
          </Button>
        </div>
      )}

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
        <h4 className="font-semibold text-orange-700 text-sm mb-2">🛡️ 프라이버시 보호</h4>
        <ul className="text-xs text-orange-600 space-y-1">
          <li>• <EyeOff className="w-3 h-3 inline mr-1" />넘기기: 관심 없는 요청을 임시로 숨깁니다</li>
          <li>• <X className="w-3 h-3 inline mr-1" />차단하기: 해당 사용자를 완전히 차단합니다</li>
          <li>• 인연 수락 전까지 실명과 사진은 공개되지 않아요</li>
          <li>• 모든 대화는 양방향 수락 후에만 시작됩니다</li>
        </ul>
      </div>
    </div>
  );
};

export default ReceivedRequests;
