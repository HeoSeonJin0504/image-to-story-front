const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 이야기 목록 조회 응답 (간단한 정보만)
export interface StoryListItem {
  story_id: number;
  story_name: string;
  image_url: string;
}

// 이야기 상세 조회 응답 (전체 정보)
export interface StoryDetail {
  story_id: number;
  story_name: string;
  story_content: string;
  image_url: string;
}

export interface ImageUploadResponse {
  story_name: string;
  story_content: string;
  original_filename: string;
}

export interface StorySaveResponse {
  filename: string;
  story_name: string;
  story_content: string;
  image_url: string;
}

export const storyApi = {
  // 이미지 업로드 및 동화 생성
  uploadImage: async (file: File, userId: number): Promise<ImageUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId.toString());

    const response = await fetch(`${API_BASE_URL}/image-upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('이미지 업로드 및 동화 생성에 실패했습니다.');
    }

    return response.json();
  },

  // 동화 저장
  saveStory: async (
    file: File,
    userId: number,
    storyName: string,
    storyContent: string
  ): Promise<StorySaveResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId.toString());
    formData.append('story_name', storyName);
    formData.append('story_content', storyContent);

    const response = await fetch(`${API_BASE_URL}/story-save`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('동화 저장에 실패했습니다.');
    }

    return response.json();
  },

  // 사용자의 동화 목록 조회 (간단한 정보만)
  getMyStories: async (userId: number): Promise<StoryListItem[]> => {
    const response = await fetch(`${API_BASE_URL}/stories/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('동화 목록을 불러오는데 실패했습니다.');
    }

    return response.json();
  },

  // 동화 상세 조회 (전체 정보)
  getStoryDetail: async (storyId: number): Promise<StoryDetail> => {
    const response = await fetch(`${API_BASE_URL}/story/${storyId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('존재하지 않는 동화입니다.');
      }
      throw new Error('동화 상세 정보를 불러오는데 실패했습니다.');
    }

    return response.json();
  },
};
