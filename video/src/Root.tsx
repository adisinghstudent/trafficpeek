import { Composition } from 'remotion';
import { Video } from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Video"
        component={Video}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
