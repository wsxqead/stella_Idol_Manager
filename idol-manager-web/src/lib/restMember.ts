import { Member } from "@/types";

// 휴식 종류 및 효과
const restOptions = {
  산책: { cost: 0, recovery: 15 },
  쇼핑: { cost: 5000, recovery: 35 },
  여행: { cost: 15000, recovery: 60 },
};

// 멤버 휴식 함수
const restMember = (
  member: Member,
  restType: string
): { member: Member; message: string } => {
  const rest = restOptions[restType as keyof typeof restOptions];
  if (!rest) return { member, message: "잘못된 휴식 유형입니다." };

  if (member.balance < rest.cost) {
    return { member, message: "재화가 부족하여 휴식을 진행할 수 없습니다!" };
  }

  return {
    member: {
      ...member,
      stamina: Math.min(100, member.stamina + rest.recovery), // 최대 100까지 회복
      balance: member.balance - rest.cost,
    },
    message: `${restType}을(를) 통해 스태미나가 ${rest.recovery}만큼 회복되었습니다!`,
  };
};

export { restMember, restOptions };
