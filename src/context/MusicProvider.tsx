import { createContext, ReactNode, useRef } from "react";

interface ContextType {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const VideoContext = createContext<ContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <VideoContext.Provider value={{ videoRef }}>
      {children}
    </VideoContext.Provider>
  );
};
