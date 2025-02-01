import { Member } from "@/types";

// 곡 발매 정보
const songTypes = {
  "커버곡 발표": {
    cost: 10000,
    baseFans: 5000,
    successMultiplier: 2,
    type: "cover",
  },
  "오리지널곡 발표": {
    cost: 30000,
    baseFans: 15000,
    successMultiplier: 3,
    type: "original",
  },
};

// 곡 발매 함수
const releaseSong = (
  member: Member,
  songType: string
): { member: Member; message: string } => {
  const song = songTypes[songType as keyof typeof songTypes];
  if (!song) return { member, message: "잘못된 곡 유형입니다." };

  if (member.balance < song.cost) {
    return { member, message: "재화가 부족합니다!" };
  }

  // 성공 확률 계산 (보컬, 작곡, 프로듀싱 능력치 반영)
  const successRate =
    (member.vocal + member.composition + member.producing) / 3;
  const isSuccess = Math.random() * 100 < successRate;

  const fanIncrease = isSuccess
    ? song.baseFans * song.successMultiplier
    : song.baseFans / 2;
  const revenue = isSuccess ? song.cost * 2 : song.cost * 0.5;

  return {
    member: {
      ...member,
      fans: member.fans + fanIncrease,
      balance: member.balance - song.cost + revenue,
      coverSongs:
        song.type === "cover"
          ? (member.coverSongs || 0) + 1
          : member.coverSongs || 0,
      originalSongs:
        song.type === "original"
          ? (member.originalSongs || 0) + 1
          : member.originalSongs || 0,
    },
    message: isSuccess
      ? "곡이 성공적으로 발매되었습니다!"
      : "곡이 기대보다 저조한 반응을 얻었습니다.",
  };
};

export { releaseSong, songTypes };
