
export const mockFriends = [
  {
    id: 1,
    nickname: "추억속그녀",
    year: 2015,
    period: "고등학교 2학년",
    location: "서울 강남구 압구정동",
    additionalInfo: "같은 반 친구",
    bio: "음악 좋아하는 직장인이에요"
  },
  {
    id: 2,
    nickname: "학창시절친구",
    year: 2016,
    period: "고등학교 3학년",
    location: "서울 강남구 신사동",
    additionalInfo: "방과후 학원 함께 다님",
    bio: "디자이너로 일하고 있어요"
  },
  {
    id: 3,
    nickname: "옛날친구123",
    year: 2014,
    period: "고등학교 1학년",
    location: "서울 강남구 청담동",
    additionalInfo: "동아리 활동 함께",
    bio: "개발자예요, 게임 좋아해요"
  },
  {
    id: 4,
    nickname: "그때그시절",
    year: 2015,
    period: "고등학교 2학년", 
    location: "경기도 성남시 분당구",
    additionalInfo: "수학 학원 같이 다님",
    bio: "회계사로 일하고 있습니다"
  },
  {
    id: 5,
    nickname: "향수팔이",
    year: 2013,
    period: "중학교 3학년",
    location: "서울 서초구 방배동",
    additionalInfo: "같은 반, 뒷자리",
    bio: "마케터, 여행 좋아해요"
  },
  {
    id: 6,
    nickname: "기억저편",
    year: 2017,
    period: "대학교 1학년",
    location: "서울 관악구 신림동",
    additionalInfo: "같은 과 동기",
    bio: "교사예요, 책 읽기 좋아함"
  },
  {
    id: 7,
    nickname: "청춘시절",
    year: 2016,
    period: "고등학교 3학년",
    location: "경기도 용인시 수지구",
    additionalInfo: "도서관에서 자주 만남",
    bio: "간호사, 운동 좋아해요"
  },
  {
    id: 8,
    nickname: "그립던시절",
    year: 2015,
    period: "고등학교 2학년",
    location: "서울 송파구 잠실동",
    additionalInfo: "축제 준비 함께",
    bio: "요리사, 맛집 탐방 좋아함"
  },
  {
    id: 9,
    nickname: "추억의학교",
    year: 2012,
    period: "중학교 2학년",
    location: "대전 유성구 관평동",
    additionalInfo: "학원 같은 반",
    bio: "공무원, 등산 좋아해요"
  },
  {
    id: 10,
    nickname: "동창회장",
    year: 2014,
    period: "고등학교 1학년",
    location: "부산 해운대구 우동",
    additionalInfo: "학생회 함께 활동",
    bio: "은행원, 영화 좋아합니다"
  }
];

export const getRandomFriends = (count: number = 5) => {
  const shuffled = [...mockFriends].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
