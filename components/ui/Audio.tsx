import { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useFocusEffect } from '@react-navigation/native';
import Btn from './Btn';
import Text from './Text';

// Static data moved outside to avoid re-creation and triggering effect cleanups
const texts = {
  ready: 'Empezar a practicar',
  playing: 'En práctica',
  paused: 'Continua practicando',
  ended: 'Practica de nuevo',
};

export default function Audio({ audioSrc }: { audioSrc: string }) {
  // Audio Player
  const player = useAudioPlayer(audioSrc);
  const status = useAudioPlayerStatus(player);

  // Component state
  const [text, setText] = useState(texts['ready']);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  // Pause audio when the page loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        try {
          if (player && player.playing) {
            player.pause();
            setText(texts['paused']);
          }
        } catch (e) {
          // Ignore errors when the player is already released
          console.log('Audio: player already released during blur');
        }
      };
    }, [player]) // Removed texts from dependencies
  );

  // Handle Play/Pause Toggle
  const togglePlayback = () => {
    try {
      if (player.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch (e) {
      console.error('Audio: Error toggling playback:', e);
    }
  };

  // React to status changes for Text updates
  useEffect(() => {
    if (status.playing) {
      setText(texts['playing']);
      if (!alreadyPlayed) {
        setAlreadyPlayed(true);
      }
    } else {
      // If we paused (and not finished), update text
      if (alreadyPlayed && !status.didJustFinish) {
        setText(texts['paused']);
      }
    }

    if (status.didJustFinish) {
      // Logic from original: Restart, Pause, Text update
      try {
        player.seekTo(0);
        player.pause();
      } catch (e) {
        // Ignore errors if player is released
      }

      setTimeout(() => {
        setText(texts['ended']);
      }, 50);
    }
  }, [status.playing, status.didJustFinish, alreadyPlayed, player]); // Removed texts from dependencies

  // Cleanup is handled by useAudioPlayer hook automatically

  return (
    <View
      className={`
        relative
        mx-auto
        w-11/12
      `}>
      <Btn
        iconSource={
          player.playing
            ? require('../../assets/icons/audio-pause.png')
            : require('../../assets/icons/audio-play.png')
        }
        onPress={togglePlayback}
        className={`
          absolute
          left-0
          top-1/2
          z-10
          flex
          h-24
          w-24
          -translate-y-1/2
          transform
          items-center
          justify-center
        `}
        classNameIcon={`
          w-12
          h-12
          ml-2
        `}
        variant="purple"
      />

      <View
        className={`
          flex
          items-end
          justify-center
          rounded-full
          bg-blue
          p-4
        `}>
        <Text
          className={`
            w-full
            pl-20
            text-center
            text-3xl
            font-bold
            text-white
          `}>
          {text}
        </Text>
      </View>
    </View>
  );
}
