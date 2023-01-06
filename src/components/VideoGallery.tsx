import * as React from 'react';

interface VideoGalleryProps {
  query: string;
  perPage: number;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ query, perPage }) => {
  const [videos, setVideos] = React.useState<Array<{ src: string }>>([]);

  React.useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(
        `https://api.pexels.com/videos/search?query=${query}&per_page=${perPage}`,
        {
          headers: {
            Authorization: '563492ad6f9170000100000190359ac9fe214f8aa02fb4d6dabde74d',
          },
        }
      );
      const data = await response.json();
      setVideos(data.videos.map((video: any) => ({ src: video.video_files[0].link })));
    };

    fetchVideos();
  }, [query, perPage]);

  const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
    const video = event.currentTarget.querySelector('video');
    const videoWrapper = event.currentTarget;

    if (video && videoWrapper) {
      const x = event.pageX - videoWrapper.offsetLeft;
      const width = videoWrapper.offsetWidth;

      video.currentTime = Math.round((x / width) * video.duration);
    }
  };

  const handleLoaded = (event: any) => {
    const video = event.currentTarget;

    if (video.buffered.length === 0) return;

    if (video.buffered.end(0) === video.duration) {
      video.setAttribute('data-loaded', 'true');
    }
  };

  return (
    <div className="video-gallery">
      {videos.map((video, index) => (
        <div className="video-wrapper" key={index} onMouseMove={handleHover}>
          <video data-loaded="false" preload="auto" onProgress={handleLoaded}>
            <source src={video.src} />
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
