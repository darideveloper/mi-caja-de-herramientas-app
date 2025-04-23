import { useVideoPlayer, VideoView } from 'expo-video';
import { View, Pressable, Animated } from 'react-native';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

interface VideoProps {
  src?: string;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
  overlaySrc?: any;
}

export default function Video({
  src = '',
  autoPlay = true,
  muted = false,
  className,
  overlaySrc,
}: VideoProps) {

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [overlayHidden, setOverlayHidden] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  // Create and setup player
  const player = useVideoPlayer(src, (player) => {
    player.loop = true;
    if (autoPlay) {
      player.play();
    }
  });

  // Pause video when the screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (isPlaying) {
          player.pause(); // Pause the video
          setIsPlaying(false); // Update the state
        }
      };
    }, [isPlaying, player])
  );

  useEffect(() => {
    if (isPlaying) {
      player.play();

      // Fade out the overlay when the video starts playing
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

    } else {
      player.pause();
    }
  }, [isPlaying]);

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
        relative
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

      {
        !autoPlay &&
        <Pressable
          className={`
            absolute
            w-full
            h-full
            flex
            items-center
            justify-center
            ${overlayHidden ? 'hidden' : 'flex'}
          `}
          onPress={() => {
            setIsPlaying(true);
            setTimeout(() => {
              setOverlayHidden(true);
            }, 500);
          }}
        >
          <Animated.Image
            source={overlaySrc}
            style={{
              width: '100%',
              height: '100%',
              opacity: fadeAnim, // Bind opacity to animated value
            }}
          />
        </Pressable>
      }
    </View>
  );
}
