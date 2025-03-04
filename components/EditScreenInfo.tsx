// Components
import { View } from 'react-native';
import Text from './ui/Text';
import Title from './ui/Title';
import Video from './ui/Video';
import Cta from './ui/Cta';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View>
      <View className="mx-4 mt-2 items-center">
        <Title
          className={`
          `}
        >
          !Bienvenido!
        </Title>

        <Video 
          src={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} 
        />

        <Cta/>

        <View className="my-2 rounded-md px-1">
        </View>
        <Text className="text-center text-lg leading-6">{description}</Text>
      </View>
    </View>
  );
};
