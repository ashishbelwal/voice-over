import { Layout } from "antd";
const { Content } = Layout;
import SidebarContent from "./SidebarContent";
import { theme } from "antd";
import { useEffect, useRef, useState } from "react";
import PromtContent from "./PromtContent";
import AudioList from "./AudioList";
import { TContentType, TContent } from "../types/types";
import Transcript from "./Transcript";
import AudioContent from "./AudioContent";
import { generateAudioFromText } from "../services/api";

const AppContent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [contentType, setContentType] = useState<TContentType>("content");
  const [content, setContent] = useState<TContent[]>([]);
  const [audioPlayerArray, setAudioPlayerArray] = useState<string[]>([]);

  const audioPlayer = useRef<HTMLAudioElement>(
    null
  ) as React.RefObject<HTMLAudioElement>;
  const [audioPlayerIndex, setAudioPlayerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationArray, setDurationArray] = useState<number[]>([]);
  const [markerTime, setMarkerTime] = useState(0);

  useEffect(() => {
    const validAudioUrls = content
      .map((item) => item.audio)
      .filter((url): url is string => !!url);
    setAudioPlayerArray(validAudioUrls);
  }, [content]);

  const getTotalTime = async () => {
    if (!audioPlayerArray || audioPlayerArray.length === 0) return;
    const getDuration = (src: string) =>
      new Promise<number>((resolve) => {
        const audio = new Audio();
        audio.src = src;
        audio.addEventListener("loadedmetadata", () => {
          resolve(audio.duration);
        });
        audio.addEventListener("error", () => {
          resolve(0);
        });
        audio.load();
      });

    try {
      const durations = await Promise.all(audioPlayerArray.map(getDuration));
      setDurationArray(durations);

      const totalTime = durations.reduce((acc, curr) => acc + curr, 0);
      setTotalTime(totalTime);
    } catch (err) {
      console.error("Error calculating durations", err);
    }
  };

  useEffect(() => {
    if (audioPlayerArray.length > 0) {
      getTotalTime();
    }
  }, [audioPlayerArray]);

  useEffect(() => {
    const audio = audioPlayer.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioPlayer]);

  const handleAudioGeneration = async (voice: string, id: string) => {
    const text = content.find((item) => item.id === id)?.text;
    if (!text) return;
    const audio = await generateAudioFromText(voice, text);
    const bufferData = audio.data.audioBlob.data;
    const uint8Array = new Uint8Array(bufferData);
    const audioBlobObj = new Blob([uint8Array], { type: "audio/mpeg" });
    const audioURL = URL.createObjectURL(audioBlobObj);
    setContent((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, audio: audioURL, audioBlob: audioBlobObj }
          : item
      )
    );
  };

  const handlePlayAtIndex = (index: number) => {
    const player = audioPlayer.current;
    if (!player) return;

    const handleCanPlay = () => {
      player.play().catch((err) => {
        console.warn("Playback error:", err);
      });
    };

    player.pause();
    player.removeEventListener("canplaythrough", handleCanPlay);

    player.src = audioPlayerArray[index];
    player.currentTime = 0;
    player.load();

    player.addEventListener("canplaythrough", handleCanPlay);
    setAudioPlayerIndex(index);
    setMarkerTime(durationArray[index]);
  };
  const handleNext = () => {
    if (audioPlayerIndex < audioPlayerArray.length - 1) {
      handlePlayAtIndex(audioPlayerIndex + 1);
    } else {
      console.log("Playlist ended");
    }
  };

  const handlePrevious = () => {
    if (audioPlayerIndex > 0) {
      handlePlayAtIndex(audioPlayerIndex - 1);
    } else {
      console.log("At beginning of playlist");
    }
  };
  const handleEnded = () => {
    console.log("audioPlayerIndex", audioPlayerIndex);
    if (audioPlayerIndex < audioPlayerArray.length - 1) {
      setAudioPlayerIndex((prev) => prev + 1);
      setCurrentTime(0);
    } else {
      console.log("Playlist ended");
    }
  };

  return (
    <div className="full-height">
      <audio
        ref={audioPlayer}
        // key={audioPlayerArray[audioPlayerIndex]}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
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
                  handleAudioGeneration={handleAudioGeneration}
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
                currentTime={currentTime}
                durationArray={durationArray}
                audioPlayerIndex={audioPlayerIndex}
                setCurrentTime={setCurrentTime}
                handleAudioGeneration={handleAudioGeneration}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
};
export default AppContent;
