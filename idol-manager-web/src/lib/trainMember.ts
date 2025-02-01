import { Member } from "@/types";

// 트레이닝 옵션 (주 스텟 + 부 스텟 적용)
const trainingOptions = {
  "보컬 연습": {
    primaryStat: "vocal",
    secondaryStat: "focus",
    primaryIncrease: 5,
    secondaryIncrease: 2,
  },
  "댄스 연습": {
    primaryStat: "dance",
    secondaryStat: "expression",
    primaryIncrease: 5,
    secondaryIncrease: 2,
  },
  "작곡 훈련": {
    primaryStat: "composition",
    secondaryStat: "producing",
    primaryIncrease: 5,
    secondaryIncrease: 2,
  },
  "수영 연습": {
    primaryStat: "stamina",
    secondaryStat: "reaction",
    primaryIncrease: 5,
    secondaryIncrease: 2,
  },
  "필라테스 교육": {
    primaryStat: "focus",
    secondaryStat: "stamina",
    primaryIncrease: 5,
    secondaryIncrease: 2,
  },
  "연기 연습": {
    primaryStat: "expression",
    secondaryStat: "visual",
    primaryIncrease: 5,
    secondaryIncrease: 2,
  },
  "미모 관리": {
    primaryStat: "visual",
    secondaryStat: "sensitivity",
    primaryIncrease: 5,
    secondaryIncrease: 2,
  },
  "도서관 학습": {
    primaryStat: "intelligence",
    secondaryStat: "sensitivity",
    primaryIncrease: 5,
    secondaryIncrease: 2,
  },
};

// 멤버 훈련 함수
const trainMember = (member: Member, trainingType: string): Member => {
  const training =
    trainingOptions[trainingType as keyof typeof trainingOptions];
  if (!training) return member;

  // 훈련으로 인한 능력치 증가
  const primaryStat = training.primaryStat as keyof Member;
  const secondaryStat = training.secondaryStat as keyof Member;

  const newPrimaryStatValue = Math.min(
    100,
    (member[primaryStat] as number) + training.primaryIncrease
  );
  const newSecondaryStatValue = Math.min(
    100,
    (member[secondaryStat] as number) + training.secondaryIncrease
  );
  const newStamina = Math.max(0, member.stamina - 10); // 훈련 시 스태미나 감소

  return {
    ...member,
    [training.primaryStat]: newPrimaryStatValue,
    [training.secondaryStat]: newSecondaryStatValue,
    stamina: newStamina,
  };
};

export { trainMember, trainingOptions };
