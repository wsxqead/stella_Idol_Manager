import { Member } from "@/types";

// 콘서트 개최 비용 및 수익
const concertConfig = {
  cost: 50000, // 기본 개최 비용
  baseRevenue: 100000, // 기본 수익
  baseFans: 30000, // 기본 팬 증가
};

// 콘서트 개최 함수
const holdConcert = (member: Member): { member: Member; message: string } => {
  if (member.originalSongs < 1) {
    return {
      member,
      message: "콘서트를 개최하려면 오리지널곡이 최소 1개 필요합니다!",
    };
  }

  if (member.balance < concertConfig.cost) {
    return { member, message: "재화가 부족하여 콘서트를 개최할 수 없습니다!" };
  }

  // 성공 확률 계산 (보컬, 댄스, 비주얼 능력치 반영)
  const successRate = (member.vocal + member.dance + member.visual) / 3;
  const isSuccess = Math.random() * 100 < successRate;

  const fanIncrease = isSuccess
    ? concertConfig.baseFans + successRate * 100
    : concertConfig.baseFans / 2;
  const revenue = isSuccess
    ? concertConfig.baseRevenue + successRate * 200
    : concertConfig.baseRevenue / 2;

  return {
    member: {
      ...member,
      fans: member.fans + fanIncrease,
      balance: member.balance - concertConfig.cost + revenue,
    },
    message: isSuccess
      ? "콘서트가 대성공을 거두었습니다!"
      : "콘서트가 예상보다 저조한 반응을 얻었습니다.",
  };
};

export { holdConcert };
