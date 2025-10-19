import type { DictionaryData } from '../types/DictionaryTypes';

export function playAudio(data: DictionaryData | null): void {
  const audioUrl = data?.phonetics.find((p) => p.audio)?.audio;
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
  }
}
