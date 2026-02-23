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
      className={`relative overflow-hidden rounded-xl bg-card group cursor-pointer border border-primary/10 hover:border-primary/20 transition-all duration-500 ${
        isShort ? "aspect-[9/16] md:aspect-[9/16]" : "aspect-video"
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
            {/* Inner shadow for depth */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: "inset 0 2px 20px hsl(220 20% 2% / 0.4)",
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/25 group-hover:bg-background/10 transition-colors duration-500" />

            {/* Glass play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-[1.04] group-hover:brightness-110"
                style={{
                  background: "hsl(218 90% 50% / 0.25)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid hsl(218 90% 60% / 0.25)",
                  boxShadow: "0 8px 24px hsl(218 90% 40% / 0.3), inset 0 1px 1px hsl(218 90% 70% / 0.15), 0 2px 8px hsl(220 20% 2% / 0.4)",
                }}
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground ml-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.5 4.25l13 7.75-13 7.75V4.25z" fill="currentColor" stroke="none" />
                </svg>
              </motion.div>
            </div>

            {/* Title overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
              <p className="text-xs md:text-sm font-medium text-foreground/90 truncate">{title}</p>
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
