import { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useFocusEffect } from '@react-navigation/native';
import Btn from './Btn';
import Text from './Text';

export default function Audio({ audioSrc }: { audioSrc: string }) {
  // Static data
  const texts = {
    ready: 'Empezar a practicar',
    playing: 'En práctica',
    paused: 'Continua practicando',
    ended: 'Practica de nuevo',
  };

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
        if (player.playing) {
          player.pause();
          // We don't need to manually reset to start if we just pause,
          // but existing logic did replayAsync()+pauseAsync().
          // We'll just pause here to be safe and simple.
          setText(texts['paused']);
        }
      };
    }, [player, texts])
  );

  // Handle Play/Pause Toggle
  const togglePlayback = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
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
      player.seekTo(0);
      player.pause();

      setTimeout(() => {
        setText(texts['ended']);
      }, 50);
    }
  }, [status.playing, status.didJustFinish, alreadyPlayed, texts, player]);

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
