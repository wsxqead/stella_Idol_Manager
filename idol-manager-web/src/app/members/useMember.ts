import { useState, useEffect } from "react";
import { Member } from "@/types";
import members from "@/lib/members";
import {
  TARGET_FANS,
  MIN_FANS_FOR_FANMEETING,
  fanEvents,
} from "@/lib/constants";

export function useMember() {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [selectedPair, setSelectedPair] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [totalFans, setTotalFans] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  useEffect(() => {
    setTotalFans(selectedMembers.reduce((sum, member) => sum + member.fans, 0));
    setTotalRevenue(
      selectedMembers.reduce((sum, member) => sum + member.balance, 0)
    );
  }, [selectedMembers]);

  useEffect(() => {
    if (totalFans >= TARGET_FANS) setGameEnded(true);
  }, [totalFans]);

  const handleSelectMember = (member: Member) => {
    setSelectedMembers([...selectedMembers, member]);
  };

  const triggerFanEvent = () => {
    const randomEvent = fanEvents[Math.floor(Math.random() * fanEvents.length)];
    setSelectedMembers((prevMembers) =>
      prevMembers.map((member) => ({
        ...member,
        fans: member.fans + Math.floor(randomEvent.fans / prevMembers.length),
      }))
    );
  };

  return {
    selectedMembers,
    selectedPair,
    selectedMember,
    totalFans,
    totalRevenue,
    gameEnded,
    handleSelectMember,
    triggerFanEvent,
  };
}
