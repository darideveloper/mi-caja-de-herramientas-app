import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View, Image } from 'react-native';

interface VideoProps {
  src?: string;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
}

export default function Video({ src = '', autoPlay = true, muted = false, className }: VideoProps) {
  // Create and setup player
  const player = useVideoPlayer(src, (player) => {
    player.loop = true;
    if (autoPlay) {
      player.play();
    }
    player.muted = muted;
  });

  return (
    <View
      className={`
        my-2
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        ${className}
      `}>
      <VideoView
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 16 / 9,
        }}
      />
    </View>
  );
}
