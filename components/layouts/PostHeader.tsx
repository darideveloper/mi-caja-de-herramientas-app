// Hooks
import { useState, useEffect } from 'react';

// Components
import { View, Image } from 'react-native';
import Title from '../ui/Title';
import Text from '../ui/Text';
import Btn from '../ui/Btn';

export default function PostHeader() {

  // Dummy data
  const postTitle = 'Título 1 del post de ejemplo';
  const postUnderline = "Para dejar de compararte"
  const durationMin = 5

  // States
  const [isfav, setIsFav] = useState<boolean>(false);


  return (
    <View
      className={`
        pt-28
        pb-24
        w-full
        inline-block
        rounded-b-3xl
        bg-purple
        relative
        overflow-hidden
      `}
    >
      <Image
        source={require('../../assets/imgs/glow-large.png')}
        className={`
          absolute
          top-0
          left-0
          w-full
          h-96
        `}
      />

      <Title
        className={`
          title
          inline-block
          text-4xl
          font-bold
          mb-4
          text-center
        `}>
        {postTitle}
      </Title>

      <Text
        className={`
          underline
          text-center
          text-white
          text-xl
        `}
      >
        {postUnderline}
      </Text>

      <Text
        className={`
          duration
          text-center
          text-white
          text-xl
          absolute
          bottom-10
          left-10
        `}
      > 
        <Text
          className={`
            font-bold
          `}
        >
          {durationMin}&nbsp;
        </Text>
        min
      </Text>

      <Btn
        className={`
          absolute
          bottom-5
          right-10
          !w-14
          !h-14
          rounded-full
          bg-transparent
          p-0
        `}
        iconSource={isfav ? require('../../assets/icons/fav-active.png') : require('../../assets/icons/fav-no-active.png')}
        onPress={() => setIsFav(!isfav)}
      />
    </View>
  );
}
