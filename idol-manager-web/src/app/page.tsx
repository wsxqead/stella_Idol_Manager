import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <h2>아이돌 그룹을 키우는 최고의 시뮬레이션!</h2>
      <p>강지가 여러분을 기다리고 있습니다!</p>
      <div className="button-group">
        <Link href="/tutorial">
          <button className="btn-primary">튜토리얼 보기</button>
        </Link>
        <Link href="/members">
          <button className="btn-secondary">멤버 관리</button>
        </Link>
      </div>
    </div>
  );
}
