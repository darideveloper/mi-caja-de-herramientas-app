import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio as ExpoAudio } from 'expo-av';
import Btn from './Btn';
import Text from './Text';

// Hooks
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Audio({ audioSrc }: { audioSrc: string }) {
  // Static data
  const texts = {
    ready: 'Empezar a practicar',
    playing: 'En práctica',
    paused: 'Continua practicando',
    ended: 'Practica de nuevo',
  };

  // Component state
  const [sound, setSound] = useState<ExpoAudio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState(texts['ready']);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  // Pause audio when the page loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (isPlaying) {
          sound?.replayAsync();
          sound?.pauseAsync();
          setIsPlaying(false);
          setText(texts['paused']);
        }
      };
    }, [isPlaying, sound])
  );

  // Manage audio play and pause status
  useEffect(() => {
    if (isPlaying) {
      // Play and update text
      sound?.playAsync();
      setText(texts['playing']);

      // Set already played to true
      if (!alreadyPlayed) {
        setAlreadyPlayed(true);
      }
    } else {
      // Pause and update text
      sound?.pauseAsync();
      if (alreadyPlayed) {
        setText(texts['paused']);
      }
    }
  }, [isPlaying]);

  // Detect when the audio ends and restart it
  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          // Restart the audio
          sound.replayAsync();

          // Pause audio
          sound.pauseAsync();
          setIsPlaying(false);

          // Update text
          setTimeout(() => {
            setText(texts['ended']);
          }, 50);
        }
      });
    }
  }, [sound]);

  // Unload sound when component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Load sound when component mounts
  useEffect(() => {
    const loadSound = async () => {
      const { sound: loadedSound } = await ExpoAudio.Sound.createAsync(
        { uri: audioSrc },
        { shouldPlay: false, isLooping: false }
      );
      setSound(loadedSound);
    };

    loadSound();
  }, [audioSrc]);

  // Unload sound when component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View
      className={`
        relative
        mx-auto
        w-11/12
      `}>
      <Btn
        iconSource={
          isPlaying
            ? require('../../assets/icons/audio-pause.png')
            : require('../../assets/icons/audio-play.png')
        }
        onPress={() => setIsPlaying(!isPlaying)}
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
