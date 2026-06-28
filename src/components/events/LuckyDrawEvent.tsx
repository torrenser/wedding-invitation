
export function LuckyDrawEvent() {
  return (
    <div className="p-6 text-center space-y-6">
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-primary">🎁 감사한 마음을 담은 럭키드로우 🎁</h4>
        <div className="text-sm text-gray-600 leading-relaxed space-y-4">
          <p className="font-medium text-gray-800">
            멀리서 발걸음 해주신 하객 여러분께 감사의 마음을 전하고자<br />
            소중한 댓글(방명록)을 남겨주신 분들 중<br />
            추첨을 통해 소정의 선물을 드립니다!
          </p>

          <div className="bg-yellow-50 p-4 rounded-lg text-xs text-yellow-800 font-medium space-y-2 max-w-sm mx-auto text-left border border-yellow-100">
            <p className="font-bold text-center text-sm mb-1">✍️ 참여 방법</p>
            <p>1. 아래 <span className="underline font-bold">방명록 작성란</span>으로 이동합니다.</p>
            <p>2. 축하 메시지와 함께 <span className="underline font-bold">어디서 오셨는지(출발 지역)</span>를 꼭 작성해 주세요.</p>
            <p className="text-[10px] text-yellow-700/80 text-center mt-2">
              (예: "부산에서 축하하러 왔어요! 결혼 축하드려요~")
            </p>
          </div>

          <p className="text-xs text-gray-500 leading-normal">
            방명록 작성 시 어디서 오셨는지 함께 작성해 주시면 감사하겠습니다.<br />
            따뜻한 격려와 많은 참여 부탁드립니다! 💖
          </p>
        </div>
      </div>
    </div>
  );
}
