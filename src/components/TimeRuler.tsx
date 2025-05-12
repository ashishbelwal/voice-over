import { useEffect, useRef } from "react";
import Ruler from "@scena/react-ruler";

const TimeRuler = ({
  setCurrentTime,
  durationArray,
}: {
  setCurrentTime: (time: number) => void;
  durationArray: number[];
}) => {
  const rulerRef = useRef<any>(null);
  const rulerRefDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => rulerRef.current?.resize();
    rulerRef.current?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTimeUpdate = (e: React.MouseEvent) => {
    if (!rulerRefDiv.current) return;

    const rect = rulerRefDiv.current.getBoundingClientRect();
    const zoom = rulerRef.current.props.zoom;

    const relativeX = e.clientX - rect.left;
    const seconds = relativeX / zoom;
    const totalTime = durationArray.reduce((acc, curr) => acc + curr, 0);
    if (seconds > totalTime) {
      setCurrentTime(totalTime);
    } else {
      setCurrentTime(seconds);
    }
  };

  return (
    <div onClick={handleTimeUpdate} ref={rulerRefDiv}>
      <Ruler
        ref={rulerRef}
        type="horizontal"
        unit={1} // 1 unit = 1 second
        zoom={60}
        backgroundColor="#fff"
        lineColor="#999"
        textColor="#333"
        height={30}
        style={{
          borderBottom: "1px solid #ddd",
          width: "100%",
          marginTop: 10,
        }}
        textFormat={(scale) => `${scale}s`}
      />
    </div>
  );
};

export default TimeRuler;
