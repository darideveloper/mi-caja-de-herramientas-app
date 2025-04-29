// Hooks
import { useState } from 'react';

// Components
import { View, Image } from 'react-native';
import Title from '../ui/Title';
import Text from '../ui/Text';
import Btn from '../ui/Btn';

interface PostHeaderProps {
  postTitle: string;
  postUnderline: string;
  durationMin: number;
}

export default function PostHeader({ postTitle, postUnderline, durationMin }: PostHeaderProps) {
  
  // States
  const [isfav, setIsFav] = useState<boolean>(false);

  return (
    <View
      className={`
        relative
        inline-block
        w-full
        overflow-hidden
        rounded-b-3xl
        bg-purple
        pb-24
        pt-24
      `}>
      <Image
        source={require('../../assets/imgs/glow-large.png')}
        className={`
          absolute
          left-0
          top-0
          h-96
          w-full
        `}
      />

      <Title
        className={`
          mb-4
          inline-block
          text-center
          text-4xl
          font-bold
          capitalize
        `}>
        {postUnderline}
      </Title>

      <Text
        className={`
          text-center
          text-xl
          text-white
          underline
          capitalize
        `}>
        {postTitle}
      </Text>

      <Text
        className={`
          duration
          absolute
          bottom-10
          left-10
          text-center
          text-xl
          text-white
        `}>
        <Text
          className={`
            font-bold
          `}>
          {durationMin}&nbsp;
        </Text>
        min
      </Text>

      <Btn
        className={`
          absolute
          bottom-5
          right-10
          !h-14
          !w-14
          rounded-full
          !bg-transparent
          p-0
        `}
        iconSource={
          isfav
            ? require('../../assets/icons/fav-active.png')
            : require('../../assets/icons/fav-no-active.png')
        }
        onPress={() => setIsFav(!isfav)}
      />
    </View>
  );
}
