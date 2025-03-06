// Component
import { View } from 'react-native';
import Title from '../ui/Title';
import Video from '../ui/Video';
import Cta from '../ui/Cta';


export default function Hero() {
  return (
    <View
      className={`
        w-full
        flex
        flex-col
        items-center
        justify-center
      `}
    >
      <Title >
        !Bienvenido!
      </Title>

      <Video
        src={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
      />

      <Cta />
    </View>
  );
}
