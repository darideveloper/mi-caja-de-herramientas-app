import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio as ExpoAudio } from 'expo-av';
import Btn from './Btn';
import Text from './Text';

export default function Audio() {
  const [sound, setSound] = useState<ExpoAudio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedOnce, setPlayedOnce] = useState(false);

  const texts = {
    ready: 'Empezar a practicar',
    playing: 'En práctica',
    paused: 'Continua practicando',
  };

  // Play and pause sound when button is pressed
  useEffect(() => {
    if (isPlaying) {
      sound?.playAsync();

      // Update text when sound is played for the first time
      if (!playedOnce) {
        setPlayedOnce(true);
      }
    } else {
      sound?.pauseAsync();
    }
  }, [isPlaying]);

  // Detect when the audio ends and restart it
  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          // Restart the audio
          sound.replayAsync();
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
        { uri: 'https://examplefiles.org/files/audio/mp3-example-file-download-1min.mp3' },
        { shouldPlay: false, isLooping: false }
      );
      setSound(loadedSound);
    };

    loadSound();
  }, []);

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
          {isPlaying ? texts.playing : playedOnce ? texts.paused : texts.ready}
        </Text>
      </View>
    </View>
  );
}
