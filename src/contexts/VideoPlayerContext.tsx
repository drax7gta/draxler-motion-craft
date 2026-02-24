import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface VideoPlayerContextType {
  activeVideoId: string | null;
  openVideo: (id: string) => void;
  closeVideo: () => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextType>({
  activeVideoId: null,
  openVideo: () => {},
  closeVideo: () => {},
});

export const useVideoPlayer = () => useContext(VideoPlayerContext);

export const VideoPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const openVideo = useCallback((id: string) => {
    setActiveVideoId(id);
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideoId(null);
  }, []);

  return (
    <VideoPlayerContext.Provider value={{ activeVideoId, openVideo, closeVideo }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
