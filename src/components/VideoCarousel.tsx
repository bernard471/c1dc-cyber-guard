import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}

interface VideoCarouselProps {
  videos: Video[];
  currentVideo: number;
  setCurrentVideo: (index: number) => void;
}

const VideoCarousel = ({ videos, currentVideo, setCurrentVideo }: VideoCarouselProps) => {
  const nextVideo = () => {
    setCurrentVideo((currentVideo + 1) % videos.length);
  };

  const previousVideo = () => {
    setCurrentVideo((currentVideo - 1 + videos.length) % videos.length);
  };

  return (
    <div className="relative w-full ">
      <div className="aspect-w-16 aspect-h-9 w-full h-[300px]">
        <iframe
          src={`https://www.youtube.com/embed/${videos[currentVideo].youtubeId}`}
          title={videos[currentVideo].title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0">
        <div className="flex justify-between px-4">
          <button
            onClick={previousVideo}
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextVideo}
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">{videos[currentVideo].title}</h3>
        <p className="text-gray-600">{videos[currentVideo].description}</p>
      </div>
    </div>
  );
};

export default VideoCarousel;
