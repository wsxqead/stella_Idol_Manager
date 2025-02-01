import { Member } from "@/types";

const broadcastOptions = {
  "FPS 게임 방송": {
    baseFans: 7000,
    baseRevenue: 8000,
    primaryStat: "dance",
    secondaryStat: "reaction",
  },
  "공포 게임 방송": {
    baseFans: 6000,
    baseRevenue: 6000,
    primaryStat: "vocal",
    secondaryStat: "reaction",
  },
  "노래 방송": {
    baseFans: 8000,
    baseRevenue: 10000,
    primaryStat: "vocal",
    secondaryStat: "expression",
  },
  "먹방 방송": {
    baseFans: 6500,
    baseRevenue: 7500,
    primaryStat: "expression",
    secondaryStat: "reaction",
  },
  "ASMR 방송": {
    baseFans: 6000,
    baseRevenue: 8000,
    primaryStat: "vocal",
    secondaryStat: "expression",
  },
  "게임 종합 방송": {
    baseFans: 7000,
    baseRevenue: 8500,
    primaryStat: "reaction",
    secondaryStat: "focus",
  },
  "토크 방송": {
    baseFans: 5000,
    baseRevenue: 6000,
    primaryStat: "expression",
    secondaryStat: "visual",
  },
};

// 멤버별 특기 방송 설정 (2개씩)
const memberSpecialties: Record<string, string[]> = {
  마시로: ["공포 게임 방송", "게임 종합 방송"],
  타비: ["FPS 게임 방송", "먹방 방송"],
  리코: ["노래 방송", "ASMR 방송"],
  유니: ["토크 방송", "먹방 방송"],
  히나: ["게임 종합 방송", "FPS 게임 방송"],
  리제: ["FPS 게임 방송", "공포 게임 방송"],
  시부키: ["공포 게임 방송", "노래 방송"],
  린: ["노래 방송", "ASMR 방송"],
  나나: ["토크 방송", "게임 종합 방송"],
};

// 방송 실행 함수
const performBroadcast = (
  member: Member,
  broadcastType: string
): { member: Member; message: string } => {
  const broadcast =
    broadcastOptions[broadcastType as keyof typeof broadcastOptions];
  if (!broadcast) return { member, message: "잘못된 방송 유형입니다." };

  // 두 개의 주요 능력치 평균을 반영한 성공률 계산
  const primaryStat = broadcast.primaryStat as keyof Member;
  const secondaryStat = broadcast.secondaryStat as keyof Member;
  // Type Assertion 사용: `as number`로 변환하여 덧셈 연산 가능하게 만듦
  const successRate =
    ((member[primaryStat] as number) + (member[secondaryStat] as number)) / 2 +
    Math.random() * 20;
  const isSuccess = successRate > 60;

  // 특기 방송 여부 확인 (2개 중 하나라도 포함되면 보너스 적용)
  const isSpecialty = memberSpecialties[member.name]?.includes(broadcastType);
  const bonusMultiplier = isSpecialty ? 1.5 : 1; // 특기 방송 시 보너스 적용

  const fanIncrease =
    (isSuccess ? broadcast.baseFans * 1.5 : broadcast.baseFans * 0.5) *
    bonusMultiplier;
  const revenueIncrease =
    (isSuccess ? broadcast.baseRevenue * 2 : broadcast.baseRevenue * 0.5) *
    bonusMultiplier;

  return {
    member: {
      ...member,
      fans: member.fans + Math.floor(fanIncrease),
      balance: member.balance + Math.floor(revenueIncrease),
    },
    message: isSpecialty
      ? `${member.name}의 특기 방송 (${broadcastType})이 대성공을 거두었습니다!`
      : isSuccess
      ? "방송이 대성공을 거두었습니다!"
      : "방송이 예상보다 저조한 반응을 얻었습니다.",
  };
};

export { performBroadcast, broadcastOptions };
