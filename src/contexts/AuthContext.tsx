
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  nickname: string;
  name: string;
  birthYear: number;
  gender?: 'male' | 'female';
  profile?: {
    currentLocation?: string;
    oldNickname?: string;
    memorablePlaces: string[];
    activityKeywords: string[];
    rememberedYears: {
      startYear: number;
      endYear: number;
      timeDescription: string;
    };
    rememberedLocation: string;
    schoolOrWork?: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: User['profile']) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  // ✅ 자동 로그인용 하드코딩
  const mockUser: User = {
    id: 'test-id-1234',
    email: 'test@example.com',
    nickname: '테스트유저',
    name: '홍길동',
    birthYear: 1995,
    gender: 'male',
    profile: {
      currentLocation: '서울',
      oldNickname: '길동이',
      memorablePlaces: ['중앙초등학교', '동네 놀이터'],
      activityKeywords: ['축구', '만화책'],
      rememberedYears: {
        startYear: 2003,
        endYear: 2006,
        timeDescription: '초등학교 시절',
      },
      rememberedLocation: '노원구',
      schoolOrWork: '중앙초등학교',
    },
  };

  setUser(mockUser);
  localStorage.setItem('bangapda_user', JSON.stringify(mockUser));
}, []);


  const login = async (email: string, password: string): Promise<boolean> => {
    // 목업 로그인 - 실제로는 서버 검증이 필요
    const savedUsers = JSON.parse(localStorage.getItem('bangapda_users') || '[]');
    const foundUser = savedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('bangapda_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        nickname: userData.nickname,
        name: userData.name,
        birthYear: userData.birthYear,
        gender: userData.gender,
        profile: userData.profile
      };

      // 기존 사용자들 목록에 추가
      const savedUsers = JSON.parse(localStorage.getItem('bangapda_users') || '[]');
      savedUsers.push({ ...newUser, password: userData.password });
      localStorage.setItem('bangapda_users', JSON.stringify(savedUsers));
      
      // 현재 사용자로 설정
      setUser(newUser);
      localStorage.setItem('bangapda_user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bangapda_user');
  };

  const updateProfile = (profile: User['profile']) => {
    if (user) {
      const updatedUser = { ...user, profile };
      setUser(updatedUser);
      localStorage.setItem('bangapda_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
