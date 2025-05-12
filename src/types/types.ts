export type TContentType = "content" | "audio";

export type TContent = {
  id: string;
  text: string;
  waveform: string | null;
  audio: string;
  voice: string;
};
