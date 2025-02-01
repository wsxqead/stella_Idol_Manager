import React from "react";
import { holdConcert } from "@/lib/holdConcert";
import { Member } from "@/types";

interface FanEventModalProps {
  member: Member;
  totalFans: number;
  onClose: () => void;
  onFanEventComplete: (updatedMember: Member) => void;
}

const MIN_FANS_FOR_FANMEETING = 50000;
const MIN_FANS_FOR_GOODS = 5000;

const FanEventModal: React.FC<FanEventModalProps> = ({
  member,
  totalFans,
  onClose,
  onFanEventComplete,
}) => {
  // 콘서트 개최
  const handleHoldConcert = () => {
    const { member: updatedMember, message } = holdConcert(member);
    onFanEventComplete(updatedMember);
    alert(`${member.name}의 콘서트 결과: ${message}`);
  };

  // 팬미팅 개최
  const handleFanMeeting = () => {
    if (totalFans < MIN_FANS_FOR_FANMEETING) {
      alert(
        `팬미팅을 개최하려면 최소 ${MIN_FANS_FOR_FANMEETING}명의 팬이 필요합니다!`
      );
      return;
    }

    const revenueGain = totalFans * 0.1;
    const updatedMember = {
      ...member,
      balance: member.balance + Math.floor(revenueGain),
      fans: member.fans + Math.floor(member.fans * 0.05),
    };

    onFanEventComplete(updatedMember);
    alert(`🎉 팬미팅 개최 성공! 매출 +${revenueGain.toFixed(0)}₩`);
  };

  // 굿즈 판매
  const handleSellGoods = () => {
    if (totalFans < MIN_FANS_FOR_GOODS) {
      alert(
        `팬미팅을 개최하려면 최소 ${MIN_FANS_FOR_GOODS}명의 팬이 필요합니다!`
      );
      return;
    }

    const revenueGain = totalFans * 0.05;
    const updatedMember = {
      ...member,
      balance: member.balance + Math.floor(revenueGain),
    };

    onFanEventComplete(updatedMember);
    alert(`🛍 굿즈 판매 완료! 매출 +${revenueGain.toFixed(0)}₩`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-[400px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🎉 {member.name}의 팬 이벤트
        </h2>

        {/* 콘서트 개최 & 팬미팅 & 굿즈 판매 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition font-bold shadow-md"
            onClick={handleHoldConcert}
          >
            콘서트 개최
          </button>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition font-bold shadow-md"
            onClick={handleFanMeeting}
          >
            🎉 팬미팅 개최
          </button>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition font-bold shadow-md"
            onClick={handleSellGoods}
          >
            🛍 굿즈 판매
          </button>
        </div>

        {/* 닫기 버튼 */}
        <div className="text-center">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition font-bold shadow-md"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FanEventModal;
