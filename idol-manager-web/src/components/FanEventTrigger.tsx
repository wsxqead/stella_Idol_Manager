import React, { useEffect } from "react";
import { fanEvents } from "@/lib/constants";
import { Member } from "@/types";

interface FanEventTriggerProps {
  turnCount: number;
  setSelectedMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setEventMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const FanEventTrigger: React.FC<FanEventTriggerProps> = ({
  turnCount,
  setSelectedMembers,
  setEventMessage,
}) => {
  useEffect(() => {
    if (turnCount > 0 && turnCount % 5 === 0) {
      const randomEvent =
        fanEvents[Math.floor(Math.random() * fanEvents.length)];
      setEventMessage(randomEvent.message);

      // 전체 팬 수 증가 적용
      setSelectedMembers((prevMembers) =>
        prevMembers.map((member) => ({
          ...member,
          fans: member.fans + Math.floor(randomEvent.fans / prevMembers.length),
        }))
      );

      // 3초 후 이벤트 메시지 사라지도록 설정
      setTimeout(() => setEventMessage(null), 3000);
    }
  }, [turnCount, setSelectedMembers, setEventMessage]); 

  return null;
};

export default FanEventTrigger;
