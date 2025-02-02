import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-black text-center p-6 relative">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 bg-grid-white opacity-10 pointer-events-none"></div>
      <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg mb-6 animate-pulse">
        🎤 아이돌 그룹을 키우는 최고의 시뮬레이션!
      </h1>
      {/* 설명 */}
      <p className="text-lg text-white opacity-90 mb-8">
        🐶 강지가 여러분을 기다리고 있습니다!
      </p>

      {/* 버튼 그룹 */}
      <div className="flex space-x-6">
        <Link href="/tutorial">
          <button className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200">
            🎮 튜토리얼 시작
          </button>
        </Link>
        <Link href="/members">
          <button className="px-8 py-4 bg-pink-600 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200">
            🎭 멤버 관리
          </button>
        </Link>
      </div>

      {/* 강지 캐릭터 애니메이션 */}
      <div className="mt-8 animate-bounce">
        <Image
          src="/images/gangzi.png"
          alt="강지"
          width={320}
          height={320}
          className="w-32 h-32"
        />
      </div>
    </div>
  );
}
