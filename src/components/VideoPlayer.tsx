import { motion } from "framer-motion";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  isShort?: boolean;
}

const VideoPlayer = ({ videoId, title, isShort = true }: VideoPlayerProps) => {
  const thumbnailUrl = isShort
    ? `https://img.youtube.com/vi/${videoId}/oar2.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const youtubeUrl = isShort
    ? `https://www.youtube.com/shorts/${videoId}`
    : `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block overflow-hidden rounded-xl bg-card group cursor-pointer border border-primary/10 hover:border-primary/20 transition-all duration-500 ${
        isShort ? "aspect-[9/16]" : "aspect-video"
      }`}
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

      {/* Play button */}
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

      {/* Bottom area: title + YouTube button */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
        <p className="text-xs md:text-sm font-medium text-foreground/90 truncate mb-1.5">
          {title}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-primary/90 group-hover:text-primary transition-colors duration-300">
          <svg
            className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Assistir no YouTube
        </span>
      </div>
    </a>
  );
};

export default VideoPlayer;
