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
  const [updatedCurrentTime, setUpdatedCurrentTime] = useState(0);

  useEffect(() => {
    const validAudioUrls = content
      .map((item) => item.audio)
      .filter((url): url is string => !!url); // Filter out undefined/null
    setAudioPlayerArray(validAudioUrls);
  }, [content]);

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
    console.log("inside getTotalTime");
    if (!audioPlayerArray || audioPlayerArray.length === 0) return;

    const getDuration = (src: string) =>
      new Promise<number>((resolve) => {
        const audio = new Audio();

        audio.src = src;

        audio.addEventListener("loadedmetadata", () => {
          resolve(audio.duration);
        });

        // In case metadata fails to load
        audio.addEventListener("error", () => {
          resolve(0);
        });

        // Force load to trigger metadata event
        audio.load();
      });

    try {
      const durations = await Promise.all(audioPlayerArray.map(getDuration));
      console.log("durations", durations);
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
  const handleAudioGeneration = async (voice: string, id: string) => {
    const text = content.find((item) => item.id === id)?.text;
    if (!text) return;
    const audio = await generateAudioFromText(voice, text);
    const bufferData = audio.data.audioBlob.data; // the array from { type: 'Buffer', data: [...] }
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
  return (
    <div className="full-height">
      {audioPlayerArray.length > 0 && (
        <audio
          ref={audioPlayer}
          key={audioPlayerArray[audioPlayerIndex]}
          onEnded={handleEnded}
          controls
          style={{ visibility: "hidden", height: 0, width: 0 }}
        >
          <source src={audioPlayerArray[audioPlayerIndex]} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

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
                currentTime={updatedCurrentTime}
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
