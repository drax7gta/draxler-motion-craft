import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoPlayer } from "@/contexts/VideoPlayerContext";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  isShort?: boolean;
}

const VideoPlayer = ({ videoId, title, isShort = true }: VideoPlayerProps) => {
  const { activeVideoId, openVideo, closeVideo } = useVideoPlayer();
  const playing = activeVideoId === videoId;
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const thumbnailUrl = isShort
    ? `https://img.youtube.com/vi/${videoId}/oar2.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const embedUrl = isShort
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&loop=1&playlist=${videoId}`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0`;

  const handlePlay = useCallback((e: React.MouseEvent) => {
    if (playing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y, id: Date.now() });
    setTimeout(() => openVideo(videoId), 300);
  }, [playing, openVideo, videoId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (playing) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [playing]);

  return (
    <>
      {/* Card */}
      <div
        className={`relative overflow-hidden rounded-xl bg-card group cursor-pointer border border-primary/10 hover:border-primary/20 transition-all duration-500 ${
          isShort ? "aspect-[9/16]" : "aspect-video"
        }`}
        onClick={handlePlay}
      >
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Inner shadow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 2px 20px hsl(220 20% 2% / 0.4)" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/25 group-hover:bg-background/10 transition-colors duration-500" />

        {/* Ripple */}
        <AnimatePresence>
          {ripple && (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x - 30,
                top: ripple.y - 30,
                width: 60,
                height: 60,
                background: "radial-gradient(circle, hsl(218 90% 55% / 0.4) 0%, transparent 70%)",
              }}
              onAnimationComplete={() => setRipple(null)}
            />
          )}
        </AnimatePresence>

        {/* Standardized glass play button */}
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
              boxShadow:
                "0 8px 24px hsl(218 90% 40% / 0.3), inset 0 1px 1px hsl(218 90% 70% / 0.15), 0 2px 8px hsl(220 20% 2% / 0.4)",
            }}
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground ml-0.5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path d="M6.5 4.25l13 7.75-13 7.75V4.25z" fill="currentColor" />
            </svg>
          </motion.div>
        </div>

        {/* Title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
          <p className="text-xs md:text-sm font-medium text-foreground/90 truncate">{title}</p>
        </div>
      </div>

      {/* Cinematic Fullscreen Modal - portaled to body */}
      {createPortal(
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center"
              onClick={closeVideo}
            >
              {/* Blurred backdrop */}
              <motion.div
                initial={{ backdropFilter: "blur(0px)" }}
                animate={{ backdropFilter: "blur(20px)" }}
                exit={{ backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-background/85"
              />

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                style={{
                  background: "hsl(220 20% 10% / 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid hsl(220 12% 20% / 0.4)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  closeVideo();
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Video container */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative z-10 ${
                  isShort
                    ? "w-[85vw] max-w-[400px] aspect-[9/16]"
                    : "w-[92vw] max-w-[1100px] aspect-video"
                } rounded-2xl overflow-hidden`}
                style={{
                  boxShadow:
                    "0 30px 80px hsl(220 20% 2% / 0.8), 0 0 60px hsl(218 90% 50% / 0.1)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={embedUrl}
                  title={title}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  frameBorder="0"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default VideoPlayer;
