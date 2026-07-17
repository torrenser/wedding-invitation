import weddingDayImg from "@/assets/images/261010.jpg";

export function WeddingDayPhoto() {
  return (
    <div className="wedding-day-photo-wrapper">
      <img
        src={weddingDayImg}
        alt="2026년 10월 10일 웨딩"
        className="wedding-day-photo"
      />
      <div className="wedding-day-photo-overlay">
        <p className="wedding-day-photo-date">2026. 10. 10</p>
      </div>
    </div>
  );
}
