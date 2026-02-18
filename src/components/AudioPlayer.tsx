import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  background: #f8f9fa;
  border: 1px solid #dce0e0;
  border-radius: 12px;
  padding: 16px 20px;
  box-sizing: border-box;
`;

const Label = styled.p`
  font-size: 0.95em;
  color: #666;
  margin: 0 0 12px 0;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const PlayButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: #abb7b7;
  color: white;
  font-size: 1.1em;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: #8fa4a4;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ProgressWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #dce0e0;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: #abb7b7;
  border-radius: 4px;
  transition: width 0.1s linear;
`;

const TimeRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.82em;
  color: #888;
`;

const ErrorMsg = styled.p`
  font-size: 0.88em;
  color: #d9534f;
  margin: 8px 0 0 0;
`;

/* ────────────────────────── 헬퍼 ────────────────────────── */

function formatTime(sec: number): string {
  if (!isFinite(sec) || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ────────────────────────── 컴포넌트 ────────────────────────── */

interface AudioPlayerProps {
  src: string;
  label?: string;
}

const AudioPlayer = ({ src, label = "🔊 동화 듣기" }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(NaN);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Audio 객체 생성 & 이벤트 등록 */
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(NaN);
    setError(null);
    setIsLoading(true);

    const onCanPlay = () => {
      setIsLoading(false);
    };
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);
    const onError = () => {
      setError("오디오를 불러올 수 없습니다.");
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("error", onError);

    // src는 이벤트 등록 후 설정해야 일부 브라우저에서 error 이벤트를 놓치지 않음
    audio.src = src;
    audio.load();

    return () => {
      audio.pause();
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("error", onError);
      audio.src = "";
      audioRef.current = null;
    };
  }, [src]);

  /* 재생 / 일시정지 */
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || error) return;

    if (audio.paused) {
      try {
        setIsLoading(true);
        await audio.play();
        setIsPlaying(true);
      } catch {
        setError("재생에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  /* 프로그레스바 클릭으로 탐색 */
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(duration)) return;
    const rect = progressRef.current!.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const pct = isFinite(duration) && duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Controls>
        <PlayButton onClick={togglePlay} disabled={isLoading || !!error} title={isPlaying ? "일시정지" : "재생"}>
          {isLoading ? "…" : isPlaying ? "⏸" : "▶"}
        </PlayButton>
        <ProgressWrapper>
          <ProgressBar ref={progressRef} onClick={handleProgressClick}>
            <ProgressFill $pct={pct} />
          </ProgressBar>
          <TimeRow>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </TimeRow>
        </ProgressWrapper>
      </Controls>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Wrapper>
  );
};

export default AudioPlayer;
