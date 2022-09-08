import React, { CSSProperties } from 'react';
import videoJs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';

function parseSize(size: number | string): string {
  if (typeof size === 'number') {
    return `${size}px`;
  }
  return size;
}

export type VideoPlayerOptions = Omit<VideoJsPlayerOptions, 'width' | 'height'>;

export type VideoPlayerProps = {
  width?: number | string;
  height?: number | string;
  options?: VideoPlayerOptions;
};

export type VideoPlayerState = {
  styleObj: CSSProperties;
};

export class VideoPlayer extends React.Component<VideoPlayerProps, VideoPlayerState> {
  static defaultProps = {
    width: undefined,
    height: undefined,
    options: {},
  };

  videoRef: React.RefObject<HTMLVideoElement>;

  player: VideoJsPlayer;

  constructor(props: VideoPlayerProps) {
    if (window) {
      // Disabling Additional <style> Elements
      window.VIDEOJS_NO_DYNAMIC_STYLE = true;
    }

    super(props);
    this.videoRef = React.createRef<HTMLVideoElement>();

    const { width, height } = props;
    this.state = {
      styleObj: { width: parseSize(width), height: parseSize(height) },
    };
  }

  // Instantiate a Video.js player when the component mounts
  componentDidMount() {
    const { videoRef } = this;
    const { options } = this.props;
    this.player = videoJs(videoRef.current, options, () => {
      videoJs.log('onPlayerReady', this);
    });
  }

  // Resize player when the component update
  componentDidUpdate(prevProps: Readonly<VideoPlayerProps>) {
    const { width, height } = this.props;
    if (prevProps.height !== height || prevProps.width !== width) {
      this.setState({ styleObj: { width: parseSize(width), height: parseSize(height) } });
    }
  }

  // Dispose the player when the component will unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // Wrap the player in a `div` with a `data-vjs-player` attribute, so Video.js
  // won't create additional wrapper in the DOM.
  //
  // See: https://github.com/videojs/video.js/pull/3856
  render() {
    const { styleObj } = this.state;
    return (
      <div data-vjs-player="" style={styleObj}>
        <video muted ref={this.videoRef} className="video-js" />
      </div>
    );
  }
}
