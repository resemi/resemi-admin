import { Divider } from '@douyinfe/semi-ui';
import { VideoPlayer } from '@/components/VideoPlayer';

export default function Page() {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      { src: '//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/master.m3u8', type: 'application/x-mpegurl' },
      { src: '//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/bbb.mp4', type: 'video/mp4' },
    ],
    poster: '//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/bbb.png',
    // muted: false,
  };

  return (
    <div>
      <div className="mb-20px">视频播放器</div>
      <VideoPlayer width={480} height={360} options={videoJsOptions} />
      <Divider margin={20} />
      <div className="mb-20px">视频播放器</div>
      <VideoPlayer width={560} height={400} options={videoJsOptions} />
    </div>
  );
}
