// 상수 데이터 관리
export const TARGET_FANS = 1000000;
export const MIN_FANS_FOR_FANMEETING = 50000;

export const fanEvents = [
  { message: "SNS 바이럴 성공! 📢", fans: 10000 },
  { message: "방송 클립이 화제됨! 🎥", fans: 7500 },
  { message: "뜻밖의 기사 보도! 📰", fans: 5000 },
  { message: "팬덤 커뮤니티 확산! 💬", fans: 12000 },
];

export const collabBroadcasts = {
  "듀오 FPS 방송": { baseFans: 15000, baseRevenue: 20000, bonus: 1.2 },
  "공포 게임 듀오 방송": { baseFans: 12000, baseRevenue: 16000, bonus: 1.15 },
  "듀엣 노래 방송": { baseFans: 18000, baseRevenue: 25000, bonus: 1.3 },
};

export const collabSongs = {
  "듀엣 발라드": { baseFans: 25000, baseRevenue: 30000, bonus: 1.3 },
  "듀엣 댄스곡": { baseFans: 22000, baseRevenue: 28000, bonus: 1.2 },
};
