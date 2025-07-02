
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Send, Calendar, MapPin } from 'lucide-react';

interface ChatScreenProps {
  onBack: () => void;
  friendInfo: {
    id: number;
    nickname: string;
    year: string;
    location: string;
    schoolOrWork?: string;
    oldNickname?: string;
    additionalInfo?: string;
  };
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onBack, friendInfo }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: `🎉 ${friendInfo.nickname}님과 인연이 연결되었어요! 이제 대화를 나눠보세요.`,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me',
        text: message,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-[600px]">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-bold text-gray-800">{friendInfo.nickname}</h2>
        </div>
        
        {/* 공통 기억 정보 카드 */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
          <CardContent className="p-3">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-purple-700 mb-1">🎞️ 공통 기억</h4>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <Calendar className="w-3 h-3" />
                <span>{friendInfo.year}</span>
                <span>•</span>
                <MapPin className="w-3 h-3" />
                <span>{friendInfo.location}</span>
                {friendInfo.schoolOrWork && (
                  <>
                    <span>•</span>
                    <span>{friendInfo.schoolOrWork}</span>
                  </>
                )}
              </div>
              {friendInfo.oldNickname && (
                <div className="text-xs text-pink-600 mt-1">
                  "{friendInfo.oldNickname}"로 불렸던 기억
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              msg.sender === 'system' 
                ? 'bg-blue-50 text-blue-700 text-center text-sm' 
                : msg.sender === 'me'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-purple-500 hover:bg-purple-600"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
