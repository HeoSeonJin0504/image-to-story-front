import React, { useState } from "react";
import styled from "styled-components";
import backgroundImage from "../photos/getstartedbackground.png";
import { storyApi } from "../api/story";

const Container = styled.div`
  display: flex;
  padding: 20px;
  position: relative;
  min-height: 100vh;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    z-index: -1;
    top: 0;
    left: 0;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
    background-color: rgba(255, 255, 255, 0.5);
    background-blend-mode: lighten;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const RightContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const LeftForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 40vw;
  height: 40vh;
  text-align: center;
  justify-content: center;
  margin-top: 120px;
  background-color: white;
  border: 2px solid #abb7b7;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: 30vh;
    margin-top: 20px;
  }
`;

const RightForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 40vw;
  min-height: 40vh;
  max-height: 100vh;
  text-align: center;
  justify-content: center;
  margin-top: 120px;
  background-color: white;
  overflow-y: auto;
  border: 2px solid #abb7b7;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 30vh;
    margin-top: 20px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 15px;
  text-decoration: none;
  background: #abb7b7;
  border: 2px solid #abb7b7;
  font-weight: bold;
  border-radius: 7px;
  color: white;
  font-size: 1.5em;
  cursor: pointer;

  &:hover {
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 5px;
`;

const StoryTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
  color: #343a40;
`;

const StoryContent = styled.p`
  font-size: 1.5em;
  line-height: 1.5;
  color: #343a40;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 1em;
  color: #333;

  a {
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const VoiceSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

const VoiceLabel = styled.p`
  font-size: 1.1em;
  color: #555;
  margin: 0;
`;

const VoiceButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const VoiceButton = styled.button<{ $active: boolean }>`
  padding: 10px 24px;
  border: 2px solid #abb7b7;
  border-radius: 7px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#abb7b7' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#555')};
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #abb7b7;
    color: white;
  }
`;

interface GetStartedProps {
  user: { name: string; id: string; user_id: number } | null;
}

const GetStarted = ({ user }: GetStartedProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState<string | null>(null);
  const [storyContent, setStoryContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [voiceGender, setVoiceGender] = useState<'MALE' | 'FEMALE'>('FEMALE');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!selectedImage) {
      alert("이미지를 먼저 업로드 해주세요.");
      return;
    }

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    setLoading(true);

    try {
      const result = await storyApi.uploadImage(selectedImage, user.user_id);
      setStoryTitle(result.story_name);
      setStoryContent(result.story_content);
    } catch (error) {
      alert("이미지 분석에 실패했습니다. 서버 error!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateClick = async () => {
    if (!selectedImage) {
      alert("이미지를 먼저 업로드 해주세요.");
      return;
    }

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    await handleAnalyzeClick();
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
        voiceGender
      );
      
      const savedDate = new Date(result.created_at);
      const formattedDate = savedDate.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      
      alert(`동화 저장이 완료되었습니다.\n저장 일시: ${formattedDate}`);
    } catch (error) {
      alert("동화 저장에 실패했습니다. 서버 error!");
    }
  };

  return (
    <Container>
      <LeftContainer>
        <LeftForm>
          {imagePreview && (
            <ImagePreview src={imagePreview} alt="Selected file preview" />
          )}
        </LeftForm>
        <ButtonContainer>
          <label htmlFor="fileInput" aria-label="이미지 선택">
            <Button as="span">사진 열기</Button>
          </label>
          <FileInput
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button onClick={handleAnalyzeClick} disabled={loading}>
            {loading ? "동화를 생성하는 중입니다!" : "동화 생성"}
          </Button>
        </ButtonContainer>
      </LeftContainer>
      <RightContainer>
        <RightForm>
          {loading ? (
            <StoryTitle>동화를 생성하는 중입니다!</StoryTitle>
          ) : storyTitle || storyContent ? (
            <>
              <StoryTitle>{storyTitle}</StoryTitle>
              <StoryContent>{storyContent}</StoryContent>
            </>
          ) : (
            <StoryTitle>이미지를 업로드해서 동화를 생성해 주세요!</StoryTitle>
          )}
        </RightForm>
        {storyTitle && storyContent && (
          <>
            <VoiceSelectWrapper>
              <VoiceLabel>목소리 선택</VoiceLabel>
              <VoiceButtons>
                <VoiceButton
                  $active={voiceGender === 'FEMALE'}
                  onClick={() => setVoiceGender('FEMALE')}
                >
                  여성
                </VoiceButton>
                <VoiceButton
                  $active={voiceGender === 'MALE'}
                  onClick={() => setVoiceGender('MALE')}
                >
                  남성
                </VoiceButton>
              </VoiceButtons>
            </VoiceSelectWrapper>
            <ButtonContainer>
              <Button onClick={handleRegenerateClick} disabled={loading}>
                재생성
              </Button>
              <Button onClick={handleSaveImageClick}>동화 저장</Button>
            </ButtonContainer>
          </>
        )}
      </RightContainer>
      <Footer>
        Designed by{" "}
        <a href="https://kr.freepik.com/free-vector/hand-drawn-winter-people-collection_20109680.htm">
          Freepik
        </a>
      </Footer>
    </Container>
  );
};

export default GetStarted;