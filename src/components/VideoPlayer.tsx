import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  isShort?: boolean;
}

const VideoPlayer = ({ videoId, title, isShort = true }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = isShort
    ? `https://img.youtube.com/vi/${videoId}/oar2.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const embedUrl = isShort
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&loop=1&playlist=${videoId}`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0`;

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-card group cursor-pointer border border-primary/15 hover:border-primary/30 transition-all duration-500 ${
        isShort ? "aspect-[9/16]" : "aspect-video"
      }`}
      onClick={() => !playing && setPlaying(true)}
    >
      <AnimatePresence mode="wait">
        {!playing ? (
          <motion.div
            key="thumbnail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/30 group-hover:bg-background/15 transition-colors duration-500" />

            {/* Play button - larger white area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-foreground/95 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-primary ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
              <p className="text-sm font-medium text-foreground truncate">{title}</p>
            </div>
          </motion.div>
        ) : (
          <motion.iframe
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
