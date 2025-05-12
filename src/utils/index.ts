export const formatContent = (text: string) => {
  const paragraphs = text
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return paragraphs.map((p, index) => ({
    id: (index + 1).toString(),
    text: p,
    waveform: null,
    audio: "",
    voice: "Alex",
  }));
};
