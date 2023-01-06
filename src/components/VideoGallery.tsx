import * as React from 'react';

interface VideoGalleryProps {
  query: string;
  perPage: number;
}

interface VideoGalleryState {
  videos: Array<{ src: string }>;
}

class VideoGallery extends React.Component<VideoGalleryProps, VideoGalleryState> {
  constructor(props: VideoGalleryProps) {
    super(props);
    this.state = {
      videos: [],
    };
  }

  async componentDidMount() {
    const { query, perPage } = this.props;
    const response = await fetch(
      `https://api.pexels.com/videos/search?query=${query}&per_page=${perPage}`,
      {
        headers: {
          Authorization: '563492ad6f9170000100000190359ac9fe214f8aa02fb4d6dabde74d',
        },
      }
    );
    const data = await response.json();
    this.setState({
      videos: data.videos.map((video: any) => ({ src: video.video_files[0].link })),
    });
  }

  handleHover = (event: React.MouseEvent<HTMLDivElement>) => {

    const video = event.currentTarget.querySelector('video')
    const videoWrapper = event.currentTarget;

    if (video && videoWrapper) {
      const x = event.pageX - videoWrapper.offsetLeft;
      const width = videoWrapper.offsetWidth;

      video.currentTime = Math.round((x / width) * video.duration);
    }
  };

  handleLoaded = (event: any) => {

    console.log('done', event)
  };



  render() {
    const { videos } = this.state;
    return (
      <div className="video-gallery">
        {
          videos.map((video, index) => (
            <div className="video-wrapper" key={index} onMouseMove={this.handleHover} >
              <video controls preload="auto" onLoadedMetadata={this.handleLoaded}>
                <source src={video.src}></source>
              </video>
            </div>
          ))
        }
      </div>
    );
  }
}

export default VideoGallery;
