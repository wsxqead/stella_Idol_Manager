"use client";

import React from "react";
import { useMember } from "@/hooks/useMember";
import { useEvent } from "@/hooks/useEvent";

export default function MembersPage() {
  const {
    selectedMembers,
    selectedMember,
    totalFans,
    totalRevenue,
    gameEnded,
    handleSelectMember,
    triggerFanEvent,
  } = useMember();
  const { eventMessage, currentDate } = useEvent();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">🎤 아이돌 매니저 게임</h1>
      <div className="flex justify-between bg-white p-4 shadow-md rounded-lg mb-6">
        <p className="text-lg font-semibold">📅 현재 날짜: <span className="text-blue-500">{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</span></p>
        <p className="text-lg font-semibold">🎤 팬 수: <span className="text-blue-500">{totalFans}</span></p>
        <p className="text-lg font-semibold">💰 매출: <span className="text-green-500">{totalRevenue}₩</span></p>
      </div>

      {gameEnded ? (
        <div className="bg-yellow-500 text-white p-6 rounded-lg text-center text-2xl font-bold">
          🎉 축하합니다! 100만 팬을 달성하여 세계적인 아이돌 그룹이 되었습니다! 🎉
        </div>
      ) : (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">🎤 멤버 선택</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {selectedMembers.length === 0 ? (
              <button onClick={() => handleSelectMember({ id: 1, name: "리코", fans: 0, balance: 0, stamina: 100 })} className="p-4 bg-white shadow-md rounded-lg text-lg font-bold hover:bg-gray-200 transition">
                리코
              </button>
            ) : (
              selectedMembers.map(member => (
                <div key={member.id} className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p>🎤 팬 수: {member.fans}</p>
                  <p>💰 매출: {member.balance}₩</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {eventMessage && <p className="text-center text-xl text-red-500">{eventMessage}</p>}
    </div>
  );
}
