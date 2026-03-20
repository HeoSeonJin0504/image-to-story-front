import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backgroundImage from "../photos/getstartedbackground.png";
import { storyApi } from "../api/story";
import { User } from "../types/user";
import { useSearchParams, useNavigate } from "react-router-dom";

const DEMO_IMAGE_URL = "/demo.png";

/* ────────── Layout ────────── */

const Container = styled.div`
  display: flex;
  padding: 32px 40px 56px;
  position: relative;
  min-height: calc(100vh - 70px);
  gap: 32px;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-color: rgba(255, 255, 255, 0.55);
    background-blend-mode: lighten;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px 16px 32px;
    gap: 0;
  }
`;

const LeftPanel = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;

  @media (max-width: 768px) {
    padding-top: 0;
    flex: unset;
  }
`;

const RightPanel = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;

  @media (max-width: 768px) {
    padding-top: 0;
    flex: unset;
  }
`;

/* ────────── Cards ────────── */

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #dce0e0;
  border-radius: 14px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const LeftCard = styled(Card)`
  width: 100%;
  max-width: 560px;
  height: 460px;          /* PC: 고정 높이 — 이미지 크기에 흔들리지 않음 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;          /* 모바일: 동적 높이 */
    min-height: 200px;
    max-width: 100%;
  }
`;

const RightCard = styled(Card)`
  width: 100%;
  max-width: 720px;
  min-height: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-y: auto;
  max-height: 70vh;

  @media (max-width: 768px) {
    max-height: none;
    max-width: 100%;
    min-height: 180px;
  }
`;

/* ────────── File Input ────────── */

const FileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #bbb;
  font-size: 0.95em;
  border: 2px dashed #dce0e0;
  border-radius: 10px;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

/* ────────── Buttons ────────── */

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 560px;

  @media (max-width: 768px) {
    margin-top: 14px;
    margin-bottom: 20px;
    max-width: 100%;
  }
`;

const Btn = styled.button`
  padding: 12px 24px;
  background: #abb7b7;
  border: 2px solid #abb7b7;
  font-weight: bold;
  border-radius: 8px;
  color: white;
  font-size: 1.1em;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s,
    transform 0.15s;
  white-space: nowrap;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &:hover:not(:disabled) {
    background: #fff;
    color: #abb7b7;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

/* ────────── Story display ────────── */

const StoryTitle = styled.h2`
  font-size: clamp(1.2em, 3vw, 1.8em);
  margin-bottom: 16px;
  color: #343a40;
  line-height: 1.3;
`;

const StoryContent = styled.p`
  font-size: clamp(0.95em, 2vw, 1.3em);
  line-height: 1.7;
  color: #444;
  text-align: left;
  white-space: pre-wrap;
  margin: 0;
`;

/* ────────── Voice selector ────────── */

const VoiceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
  width: 100%;
  max-width: 720px;
`;

const VoiceLabel = styled.p`
  font-size: 1em;
  color: #666;
  margin: 0;
`;

const VoiceBtns = styled.div`
  display: flex;
  gap: 10px;
`;

const VoiceBtn = styled.button<{ $active: boolean }>`
  padding: 9px 24px;
  border: 2px solid #abb7b7;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#abb7b7" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#666")};
  transition:
    background 0.2s,
    color 0.2s;
  &:hover {
    background: #abb7b7;
    color: white;
  }
`;

const PreviewBtn = styled.button`
  padding: 8px 20px;
  border: 2px solid #abb7b7;
  border-radius: 8px;
  font-size: 0.95em;
  font-weight: bold;
  cursor: pointer;
  background: white;
  color: #666;
  transition:
    background 0.2s,
    color 0.2s;
  &:hover:not(:disabled) {
    background: #abb7b7;
    color: white;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ────────── Footer ────────── */

const FreepikFooter = styled.footer`
  position: absolute;
  bottom: 14px;
  left: 14px;
  font-size: 0.8em;
  color: #aaa;
  z-index: 10;

  a {
    color: #aaa;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ────────── Component ────────── */

interface GetStartedProps {
  user: User | null;
}

const GetStarted = ({ user }: GetStartedProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isDemoMode = searchParams.get('demo') === 'true';

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState<string | null>(null);
  const [storyContent, setStoryContent] = useState<string | null>(null);
  const [storyImageUrl, setStoryImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [voiceGender, setVoiceGender] = useState<"MALE" | "FEMALE">("FEMALE");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const previewAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const previewBlobUrlRef = React.useRef<string | null>(null);

  // 데모 모드이고 사용자가 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (isDemoMode && !user) {
      navigate('/login');
    }
  }, [isDemoMode, user, navigate]);

  useEffect(() => {
    if (!isDemoMode) {
      stopPreview();
      setStoryTitle(null);
      setStoryContent(null);
      setStoryImageUrl(null);
      setVoiceGender("FEMALE");
    }
  }, [isDemoMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!isDemoMode && !selectedImage) {
      alert("이미지를 먼저 업로드 해주세요.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (isDemoMode) {
        result = await storyApi.getDemo();
        const nextDemoImageUrl = result.image_url?.trim();
        setStoryImageUrl(nextDemoImageUrl || null);
      } else {
        result = await storyApi.uploadImage(selectedImage!, user.user_id);
      }
      setStoryTitle(result.story_name);
      setStoryContent(result.story_content);
    } catch (error) {
      const message = error instanceof Error ? error.message : "생성에 실패했습니다.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const stopPreview = () => {
    previewAudioRef.current?.pause();
    previewAudioRef.current = null;
    if (previewBlobUrlRef.current) {
      URL.revokeObjectURL(previewBlobUrlRef.current);
      previewBlobUrlRef.current = null;
    }
    setPreviewPlaying(false);
  };

  const handlePreviewClick = async () => {
    if (!storyContent) return;
    stopPreview();
    setPreviewLoading(true);
    try {
      const ttsFunction = isDemoMode ? storyApi.demoTtsPreview : storyApi.ttsPreview;
      const blob = await ttsFunction(storyContent, voiceGender);
      const url = URL.createObjectURL(blob);
      previewBlobUrlRef.current = url;
      const audio = new Audio(url);
      previewAudioRef.current = audio;
      audio.onended = () => {
        URL.revokeObjectURL(url);
        previewBlobUrlRef.current = null;
        previewAudioRef.current = null;
        setPreviewPlaying(false);
      };
      await audio.play();
      setPreviewPlaying(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "TTS 미리듣기에 실패했습니다.";
      alert(message);
      setPreviewPlaying(false);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleVoiceGenderChange = (gender: "MALE" | "FEMALE") => {
    if (gender === voiceGender) return;
    stopPreview();
    setVoiceGender(gender);
  };

  const handleSaveImageClick = async () => {
    if (!selectedImage || !storyTitle || !storyContent) {
      alert("그림을 업로드해서 동화를 생성해 주세요.");
      return;
    }
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const result = await storyApi.saveStory(
        selectedImage,
        user.user_id,
        storyTitle,
        storyContent,
        voiceGender,
      );
      const formattedDate = new Date(result.created_at).toLocaleString(
        "ko-KR",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
      );
      alert(`동화 저장이 완료되었습니다.\n저장 일시: ${formattedDate}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "동화 저장에 실패했습니다.";
      alert(message);
    }
  };

  const demoPreviewSrc = storyImageUrl && storyImageUrl.trim().length > 0
    ? storyImageUrl
    : DEMO_IMAGE_URL;

  return (
    <Container>
      <LeftPanel>
        <LeftCard>
          {isDemoMode ? (
            <ImagePreview
              src={demoPreviewSrc}
              alt="데모 이미지"
              onError={() => {
                setStoryImageUrl(null);
              }}
            />
          ) : imagePreview ? (
            <ImagePreview src={imagePreview} alt="선택한 이미지 미리보기" />
          ) : (
            <ImagePlaceholder>
              <span>사진을 선택해 주세요</span>
            </ImagePlaceholder>
          )}
        </LeftCard>
        {!isDemoMode && (
          <ButtonRow>
            <label htmlFor="fileInput">
              <Btn as="span" style={{ cursor: "pointer" }}>
                사진 열기
              </Btn>
            </label>
            <FileInput
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Btn onClick={handleAnalyzeClick} disabled={loading}>
              {loading ? "생성 중…" : "동화 생성"}
            </Btn>
          </ButtonRow>
        )}
        {isDemoMode && (
          <ButtonRow>
            <Btn onClick={handleAnalyzeClick} disabled={loading}>
              {loading ? "생성 중…" : "데모 이미지로 동화 생성"}
            </Btn>
          </ButtonRow>
        )}
      </LeftPanel>

      <RightPanel>
        <RightCard>
          {loading ? (
            <StoryTitle>{isDemoMode ? "동화를 생성하는 중입니다!" : "동화를 생성하는 중입니다!"}</StoryTitle>
          ) : storyTitle || storyContent ? (
            <>
              <StoryTitle>{storyTitle}</StoryTitle>
              <StoryContent>{storyContent}</StoryContent>
            </>
          ) : (
            <StoryTitle style={{ margin: 0 }}>
              {isDemoMode ? (
                <>
                  버튼을 누르면
                  <br />
                  동화가 생성됩니다!
                </>
              ) : (
                <>
                  이미지를 업로드해서
                  <br />
                  동화를 생성해 주세요!
                </>
              )}
            </StoryTitle>
          )}
        </RightCard>

        {storyTitle && storyContent && (
          <>
            <VoiceSection>
              <VoiceLabel>목소리 선택</VoiceLabel>
              <VoiceBtns>
                <VoiceBtn
                  $active={voiceGender === "FEMALE"}
                  onClick={() => handleVoiceGenderChange("FEMALE")}
                >
                  여성
                </VoiceBtn>
                <VoiceBtn
                  $active={voiceGender === "MALE"}
                  onClick={() => handleVoiceGenderChange("MALE")}
                >
                  남성
                </VoiceBtn>
              </VoiceBtns>
              <PreviewBtn
                onClick={handlePreviewClick}
                disabled={previewLoading || previewPlaying}
              >
                {previewLoading ? "불러오는 중…" : "🔊 미리듣기"}
              </PreviewBtn>
              {previewPlaying && (
                <PreviewBtn onClick={stopPreview}>⏹ 정지</PreviewBtn>
              )}
            </VoiceSection>
            {!isDemoMode && (
              <ButtonRow style={{ maxWidth: "720px" }}>
                <Btn onClick={handleAnalyzeClick} disabled={loading}>
                  재생성
                </Btn>
                <Btn onClick={handleSaveImageClick}>동화 저장</Btn>
              </ButtonRow>
            )}
            {isDemoMode && (
              <ButtonRow style={{ maxWidth: "720px" }}>
                <Btn onClick={handleAnalyzeClick} disabled={loading}>
                  재생성
                </Btn>
                <Btn onClick={() => navigate("/get-started")}>정식 체험하기</Btn>
              </ButtonRow>
            )}
          </>
        )}
      </RightPanel>
      <FreepikFooter>
        Designed by{" "}
        <a href="https://kr.freepik.com/free-vector/hand-drawn-winter-people-collection_20109680.htm">
          Freepik
        </a>
      </FreepikFooter>
    </Container>
  );
};

export default GetStarted;