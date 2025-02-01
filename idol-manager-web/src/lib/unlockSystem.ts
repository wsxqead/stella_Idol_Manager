import { Member } from "@/types";
import members from "@/lib/members";

// 팬 수 기준
const unlockThresholds = [
  20000, 40000, 70000, 100000, 150000, 200000, 300000, 400000,
];

// 팬 수에 따라 새로운 멤버를 선택할 수 있는지 확인
const canUnlockNewMember = (
  currentFans: number,
  selectedMembersCount: number
): boolean => {
  return (
    selectedMembersCount < members.length &&
    currentFans >= unlockThresholds[selectedMembersCount - 1]
  );
};

// 선택되지 않은 멤버 목록 반환
const getUnselectedMembers = (selectedMembers: Member[]): Member[] => {
  return members.filter((member) => !selectedMembers.includes(member));
};

export { canUnlockNewMember, getUnselectedMembers };
