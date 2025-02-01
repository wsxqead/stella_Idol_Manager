import Link from "next/link";

export default function TutorialPage() {
  return (
    <div className="tutorial-container">
      <h2>🎤 강지의 게임 가이드 🎤</h2>
      <p>
        환영합니다! 아이돌 매니저가 되어 그룹을 최고의 아이돌로 성장시키세요.
      </p>
      <ul>
        <li>✅ 멤버를 선택하고 훈련을 시켜 실력을 키우세요.</li>
        <li>✅ 커버곡과 오리지널곡을 발표해 팬을 늘리세요.</li>
        <li>✅ 콘서트를 열어 더 큰 팬덤을 확보하세요.</li>
        <li>✅ 목표를 달성하면 최고의 아이돌 그룹이 됩니다!</li>
      </ul>
      <Link href="/members">
        <button className="btn-primary">게임 시작하기</button>
      </Link>
    </div>
  );
}
