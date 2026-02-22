export function InvitationText() {
  return (
    <section className="py-20 px-8 text-center flex flex-col items-center justify-center space-y-8 bg-white">
      <h2 className="text-lg font-bold text-primary tracking-wide mb-2">
        소중한 분들을 초대합니다.
      </h2>
      <div className="space-y-3 text-gray-600 leading-loose text-sm">
        <p>포근한 바람이 머물던 봄,</p>
        <p>서로에게 작은 쉼이 되어 준 두 사람이</p>
        <p>계절을 함께 지나오며</p>
        <p>겨울의 깊은 온기 속에서 하나의 결실을 맺고자 합니다.</p>
        <br />
        <p className="text-base font-semibold text-gray-800">
          10월 10일 토요일,
        </p>
        <br />
        <p>저희의 첫걸음을 축복해 주신다면</p>
        <p>그 따스한 마음을 두 사람의 삶 속에 간직하겠습니다.</p>
      </div>
    </section>
  );
}