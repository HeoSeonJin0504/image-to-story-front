import { useEffect, useState } from "react";
import styled from "styled-components";
import { storyApi, StoryListItem, StoryDetail } from "../api/story";
import backgroundImage from "../photos/getstartedbackground.png";
import { AudioPlayer } from "../components";
import { User } from "../types/user";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 70px);
  padding: 40px 24px 60px;
  position: relative;

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
    padding: 24px 16px 40px;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.6em, 3.5vw, 2.4em);
  margin-bottom: 32px;
  color: #343a40;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StoryCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #dce0e0;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition:
    transform 0.25s,
    box-shadow 0.25s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #eee;
`;

const StoryTitle = styled.h2`
  font-size: clamp(1.1em, 2.5vw, 1.5em);
  margin-bottom: 8px;
  color: #343a40;
`;

const StoryContent = styled.p`
  font-size: clamp(0.9em, 1.8vw, 1.1em);
  line-height: 1.6;
  color: #555;
  margin-bottom: 10px;
  white-space: pre-wrap;
`;

const StoryDate = styled.p`
  font-size: 0.88em;
  color: #999;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 12px;
    align-items: flex-start;
  }
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 28px;
  width: 100%;
  max-width: 720px;
  position: relative;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  margin: auto;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f5f5f5;
  border: 1.5px solid #ddd;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.3em;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    transform 0.2s;
  &:hover {
    background: #e0e0e0;
    transform: scale(1.1);
  }
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 360px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 18px;
  border: 1px solid #eee;
`;

const DeleteButton = styled.button`
  padding: 11px 22px;
  background: #e05252;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: clamp(0.9em, 2vw, 1.1em);
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #c0392b;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  flex-wrap: wrap;
  gap: 10px;
`;

const StateMessage = styled.div<{ $error?: boolean }>`
  font-size: clamp(1em, 2.5vw, 1.4em);
  color: ${({ $error }) => ($error ? "#e05252" : "#666")};
  text-align: center;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  border: 2px solid ${({ $error }) => ($error ? "#e05252" : "#dce0e0")};
`;

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

interface MyPageProps {
  user: User | null;
  isAuthReady: boolean;
}

const MyPage = ({ user, isAuthReady }: MyPageProps) => {
  const [stories, setStories] = useState<StoryListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      if (!isAuthReady) return;
      if (!user) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }
      try {
        const data = await storyApi.getMyStories(user.user_id);
        setStories(data);
      } catch {
        setError("동화 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [user, isAuthReady]);

  const handleCardClick = async (storyId: number) => {
    setDetailLoading(true);
    try {
      const detail = await storyApi.getStoryDetail(storyId);
      setSelectedStory(detail);
    } catch {
      alert("동화 상세 정보를 불러오는데 실패했습니다.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDeleteStory = async () => {
    if (!selectedStory) return;
    if (
      !window.confirm(
        `"${selectedStory.story_name}"을(를) 정말 삭제하시겠습니까?\n삭제한 동화는 복구할 수 없습니다.`,
      )
    )
      return;
    setDeleting(true);
    try {
      await storyApi.deleteStory(selectedStory.story_id);
      setStories(stories.filter((s) => s.story_id !== selectedStory.story_id));
      setSelectedStory(null);
      alert("동화가 성공적으로 삭제되었습니다.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "동화 삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <Container>
      <Title>나의 동화</Title>

      {loading ? (
        <StateMessage>동화 목록을 불러오는 중...</StateMessage>
      ) : error ? (
        <StateMessage $error>{error}</StateMessage>
      ) : stories.length === 0 ? (
        <StateMessage>저장된 동화가 없습니다.</StateMessage>
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
                    "https://placehold.co/350x220?text=Image+Not+Found";
                }}
              />
              <StoryTitle>{story.story_name}</StoryTitle>
              <StoryDate>{formatDate(story.created_at)}</StoryDate>
            </StoryCard>
          ))}
        </StoriesGrid>
      )}

      {selectedStory && (
        <ModalOverlay onClick={() => setSelectedStory(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedStory(null)}>×</CloseButton>
            <ModalImage
              src={selectedStory.image_url}
              alt={selectedStory.story_name}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/350x220?text=Image+Not+Found";
              }}
            />
            <StoryTitle>{selectedStory.story_name}</StoryTitle>
            <StoryContent>{selectedStory.story_content}</StoryContent>
            {selectedStory.audio_url && (
              <AudioPlayer src={selectedStory.audio_url} />
            )}
            <ModalFooter>
              <StoryDate>{formatDate(selectedStory.created_at)}</StoryDate>
              <DeleteButton onClick={handleDeleteStory} disabled={deleting}>
                {deleting ? "삭제 중…" : "동화 삭제"}
              </DeleteButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {detailLoading && (
        <ModalOverlay>
          <StateMessage style={{ alignSelf: "center" }}>
            동화 내용을 불러오는 중...
          </StateMessage>
        </ModalOverlay>
      )}

      <FreepikFooter>
        Designed by{" "}
        <a href="https://kr.freepik.com/free-vector/hand-drawn-winter-people-collection_20109680.htm">
          Freepik
        </a>
      </FreepikFooter>
    </Container>
  );
};

export default MyPage;
