import { Layout } from "antd";
const { Content } = Layout;
import SidebarContent from "./SidebarContent";
import { theme } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import PromtContent from "./PromtContent";
import AudioList from "./AudioList";
import { TContentType, TContent } from "../types/types";
import Transcript from "./Transcript";
import AudioContent from "./AudioContent";

const AppContent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [contentType, setContentType] = useState<TContentType>("content");
  const [content, setContent] = useState<TContent[]>([]);
  const [audioPlayerArray, setAudioPlayerArray] = useState<string[]>([
    "../../public/sample-1.mp3",
    "../../public/sample-2.mp3",
    "../../public/sample-3.mp3",
  ]);
  const audioPlayer = useRef<HTMLAudioElement>(
    null
  ) as React.RefObject<HTMLAudioElement>;
  const [audioPlayerIndex, setAudioPlayerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationArray, setDurationArray] = useState<number[]>([]);
  const [updatedCurrentTime, setUpdatedCurrentTime] = useState(0);

  // useEffect(() => {
  //   console.log(content);
  // }, [content]);

  const getPreviousAudioTime = useCallback(() => {
    let totalTimeOfPreviousAudios = durationArray
      .slice(0, audioPlayerIndex)
      .reduce((acc, curr) => acc + curr, 0);
    return totalTimeOfPreviousAudios || 0;
  }, [audioPlayerIndex]);

  useEffect(() => {
    setUpdatedCurrentTime(currentTime + getPreviousAudioTime());
  }, [currentTime, getPreviousAudioTime]);

  const getTotalTime = async () => {
    let totalTime = 0;

    const getDuration = (src: string) =>
      new Promise<number>((resolve) => {
        const audio = new Audio(src);
        audio.addEventListener("loadedmetadata", () => {
          resolve(audio.duration);
        });
        audio.addEventListener("error", () => {
          resolve(0);
        });
      });

    const durations = await Promise.all(audioPlayerArray.map(getDuration));
    setDurationArray(durations);
    // console.log("Duration Array", durations);
    totalTime = durations.reduce((acc, curr) => acc + curr, 0);
    // console.log("Duration Array", durations);
    setTotalTime(totalTime);
  };

  useEffect(() => {
    getTotalTime();
  }, [audioPlayerArray]);

  const handleEnded = () => {
    if (audioPlayerIndex < audioPlayerArray.length - 1) {
      setAudioPlayerIndex((prev) => prev + 1);
    } else {
      console.log("Playlist ended");
    }
  };
  const handleTimeUpdate = () => {
    if (!audioPlayer.current) return;
    setCurrentTime(audioPlayer.current.currentTime || 0);
  };

  useEffect(() => {
    if (audioPlayerIndex > 0) {
      audioPlayer.current?.load();
      audioPlayer.current?.play();
    }
  }, [audioPlayerIndex]);

  useEffect(() => {
    const audio = audioPlayer.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioPlayer]);

  const handleNext = () => {
    if (audioPlayerIndex < audioPlayerArray.length - 1) {
      setAudioPlayerIndex((prev) => prev + 1);
    } else {
      console.log("Playlist ended");
    }
  };
  const handlePrevious = () => {
    if (audioPlayerIndex > 0) {
      setAudioPlayerIndex((prev) => prev - 1);
    } else {
      console.log("Playlist ended");
    }
  };
  return (
    <div className="full-height">
      <audio
        ref={audioPlayer}
        onEnded={handleEnded}
        controls
        style={{ visibility: "hidden", height: 0, width: 0 }}
      >
        <source src={audioPlayerArray[audioPlayerIndex]} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Layout style={{ background: colorBgContainer, marginTop: -21 }}>
        <SidebarContent
          contentType={contentType}
          setContentType={setContentType}
        />
        <Content style={{ minHeight: 280 }}>
          <div style={{ height: "calc(100% - 200px)" }}>
            <div className="content-container">
              <div className="full-height content-type-container">
                {contentType === "content" ? (
                  <PromtContent setContent={setContent} content={content} />
                ) : (
                  <AudioList />
                )}
              </div>
              <div className="full-height transcript">
                <Transcript
                  content={content}
                  setContentType={setContentType}
                  setContent={setContent}
                />
              </div>
            </div>
            <div className="audio-container">
              <AudioContent
                content={content}
                audioPlayer={audioPlayer}
                isPlaying={isPlaying}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                totalTime={totalTime}
                currentTime={updatedCurrentTime}
                durationArray={durationArray}
                audioPlayerIndex={audioPlayerIndex}
                setCurrentTime={setCurrentTime}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
};
export default AppContent;
