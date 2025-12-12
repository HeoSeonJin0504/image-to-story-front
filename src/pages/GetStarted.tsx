import React, { useState } from "react";
import styled from "styled-components";
import backgroundImage from "../photos/getstartedbackground.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

interface GetStartedProps {
  user: { name: string; id: string; user_id: number } | null;
}

const GetStarted = ({ user }: GetStartedProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState<string | null>(null);
  const [storyContent, setStoryContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

    const formData = new FormData();
    formData.append("file", selectedImage as Blob);
    formData.append("user_id", user.user_id.toString());

    try {
      const response = await fetch(`${API_BASE_URL}/image-upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("이미지 업로드 실패");
      }

      const result = await response.json();
      setStoryTitle(result.story_name);
      setStoryContent(result.story_content);
    } catch (error) {
      console.error("Error:", error);
      alert("이미지 분석에 실패했습니다. 서버 error!");
    } finally {
      setLoading(false);
    }
  };

  const handleBrailleClick = async () => {
    if (!storyContent) {
      alert("먼저 동화를 생성해 주세요.");
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/braille-generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ story_content: storyContent }),
      });
      alert("점자 생성이 완료되었습니다.");
    } catch (error) {
      console.error("Error during API call:", error);
      alert("점자 생성에 실패했습니다. 서버 error!");
    }
  };

  const handleSaveImageClick = async () => {
    if (!selectedImage || !storyTitle || !storyContent) {
      alert("그림을 업로드해서 그림을 생성해 주세요.");
      return;
    }

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage as Blob);
    formData.append("story_title", storyTitle);
    formData.append("story_content", storyContent);
    formData.append("user_id", user.user_id.toString());

    try {
      const response = await fetch(`${API_BASE_URL}/save-story`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("동화 저장이 완료되었습니다.");
      } else {
        alert("동화 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
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
            {loading ? "동화를 생성하는 중입니다!" : "그림 저장 및 동화 생성"}
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
          <ButtonContainer>
            <Button onClick={handleBrailleClick}>점자 생성</Button>
            <Button onClick={handleSaveImageClick}>동화 저장</Button>
          </ButtonContainer>
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