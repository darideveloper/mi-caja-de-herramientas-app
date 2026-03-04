// Components
import { View } from 'react-native';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import Text from '../ui/Text';
import Btn from '../ui/Btn';
import Audio from '../ui/Audio';
import Video from '../ui/Video';

// Ensure Image is registered with NativeWind locally
cssInterop(Image, { className: 'style' });

// Libs
import { Linking } from 'react-native';
import { PostLinkType } from 'types/post';
import { getAbsoluteUrl } from '../../lib/api';

interface PostBodyProps {
  text: string;
  links: PostLinkType[];
  imageLink?: string;
  audioLink?: string;
  videoLink?: string;
}

export default function PostBody({ text, links, imageLink, audioLink, videoLink }: PostBodyProps) {
  console.log({ links });

  return (
    <View
      className={`
        body
        bg-white
        pb-12
        pt-24
    `}>
      {/* Text */}
      {text && (
        <View
          className={`
            text-wrapper
            mx-auto
            mb-12
            w-10/12
            rounded-3xl
            bg-white
            px-6
            py-4
            shadow-md
            shadow-purpleDark
          `}>
          <Text
            className={`
              text-center
              text-xl
              text-black
            `}>
            {text}
          </Text>
        </View>
      )}

      {/* Links */}
      {links.length > 0 && (
        <View
          className={`
            links-wrapper
            mx-auto
            mb-12
            w-10/12
            flex-row
            justify-center
            gap-6
          `}>
          {links.map((link: PostLinkType) => (
            <Btn
              key={link.id}
              iconSource={getAbsoluteUrl(link.icon)}
              onPress={() => {
                const url = link.url;
                if (url) {
                  Linking.openURL(url);
                }
              }}
              className={`
                  link
                  h-14
                  w-14
                `}
              classNameIcon={`
                  w-14
                  h-14
                `}
            />
          ))}
        </View>
      )}

      {/* Image */}
      {imageLink && (
        <View
          className={`
            img-wrapper
            ${videoLink ? 'mb-12' : 'mb-8'}
            h-96
            w-full
            bg-white
          `}>
          <Image source={getAbsoluteUrl(imageLink)} className="h-full w-full" contentFit="cover" />
        </View>
      )}

      {/* Audio player */}
      {audioLink && <Audio audioSrc={audioLink} />}

      {/* Video player */}
      {videoLink && (
        <Video src={videoLink} autoPlay={false} className={`mx-auto !mt-16 !w-11/12`} />
      )}
    </View>
  );
}
