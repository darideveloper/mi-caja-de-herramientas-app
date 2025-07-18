// Components
import { View, Image } from 'react-native';
import Text from '../ui/Text';

interface PostHeaderProps {
  title: string;
}

export default function ResultsHeader({ title }: PostHeaderProps) {
  return (
    <View
      className={`
        bg-white
      `}>
      <View
        className={`
          relative
          inline-block
          w-full
          overflow-hidden
          rounded-br-3xl
          bg-purpleDark
          py-12
        `}>
        <Image
          source={require('../../assets/imgs/glow-large.png')}
          className={`
            absolute
            left-0
            top-0
            h-72
            w-full
            opacity-40
          `}
        />

        <Text
          className={`
            text-center
            text-xl
            capitalize
            text-white
          `}>
          {title}
        </Text>
      </View>
    </View>
  );
}
