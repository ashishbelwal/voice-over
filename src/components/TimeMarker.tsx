const TimeMarker = ({ currentTime }: { currentTime: number }) => {
  const ZOOM = 20;
  // console.log("currentTime", currentTime);
  // console.log(currentTime, currentTime * ZOOM);
  return (
    <div
      className="time-marker"
      style={{
        left: `${currentTime * ZOOM}px`,
      }}
    >
      <div className="marker-icon"></div>
    </div>
  );
};

export default TimeMarker;
