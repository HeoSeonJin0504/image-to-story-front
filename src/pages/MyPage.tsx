import { useEffect, useState } from "react";
import styled from "styled-components";
import { storyApi, StoryListItem, StoryDetail } from "../api/story";
import backgroundImage from "../photos/getstartedbackground.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
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
    padding: 20px 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 40px;
  color: #343a40;

  @media (max-width: 768px) {
    font-size: 2em;
    margin-bottom: 30px;
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StoryCard = styled.div`
  background-color: white;
  border: 2px solid #abb7b7;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
`;

const StoryTitle = styled.h2`
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #343a40;
`;

const StoryContent = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  color: #555;
  margin-bottom: 10px;
  white-space: pre-wrap;
`;

// 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 20px;
    width: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 2em;
  cursor: pointer;
  color: #555;
  
  &:hover {
    color: #000;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
`;

const LoadingMessage = styled.div`
  font-size: 1.5em;
  color: #555;
  text-align: center;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  font-size: 1.5em;
  color: #d9534f;
  text-align: center;
  padding: 40px;
`;

const EmptyMessage = styled.div`
  font-size: 1.5em;
  color: #555;
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #abb7b7;
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

interface MyPageProps {
  user: { name: string; id: string; user_id: number } | null;
}

const MyPage = ({ user }: MyPageProps) => {
  const [stories, setStories] = useState<StoryListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStories = async () => {
      if (!user) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        const data = await storyApi.getMyStories(user.user_id);
        setStories(data);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError("동화 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [user]);

  const handleCardClick = async (storyId: number) => {
    setDetailLoading(true);
    try {
      const detail = await storyApi.getStoryDetail(storyId);
      setSelectedStory(detail);
    } catch (err) {
      console.error("상세 정보 조회 실패:", err);
      alert("동화 상세 정보를 불러오는데 실패했습니다.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
  };

  if (loading) {
    return (
      <Container>
        <Title>나의 동화</Title>
        <LoadingMessage>동화 목록을 불러오는 중...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>나의 동화</Title>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>나의 동화</Title>
      {stories.length === 0 ? (
        <EmptyMessage>저장된 동화가 없습니다.</EmptyMessage>
      ) : (
        <StoriesGrid>
          {stories.map((story) => (
            <StoryCard 
              key={story.story_id} 
              onClick={() => handleCardClick(story.story_id)}
            >
              <StoryImage
                src={story.image_url}
                alt={story.story_name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/350x250?text=Image+Not+Found";
                }}
              />
              <StoryTitle>{story.story_name}</StoryTitle>
            </StoryCard>
          ))}
        </StoriesGrid>
      )}

      {/* 상세 정보 모달 */}
      {selectedStory && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <ModalImage
              src={selectedStory.image_url}
              alt={selectedStory.story_name}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/800x400?text=Image+Not+Found";
              }}
            />
            <StoryTitle>{selectedStory.story_name}</StoryTitle>
            <StoryContent>{selectedStory.story_content}</StoryContent>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* 로딩 모달 */}
      {detailLoading && (
        <ModalOverlay>
          <LoadingMessage>동화 내용을 불러오는 중...</LoadingMessage>
        </ModalOverlay>
      )}
      <Footer>
        Designed by{" "}
        <a href="https://kr.freepik.com/free-vector/hand-drawn-winter-people-collection_20109680.htm">
          Freepik
        </a>
      </Footer>
    </Container>
  );
};

export default MyPage;
