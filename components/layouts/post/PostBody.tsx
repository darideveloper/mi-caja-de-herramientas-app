// Components
import { View, Image } from 'react-native';
import Text from '../../ui/Text';
import Btn from '../../ui/Btn';
import Audio from '../../ui/Audio';
import Video from '../../ui/Video';

// Libs
import { Linking } from 'react-native';
import { PostLinkType } from 'types/post';

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
        -z-10
        -mt-12
        mb-12
        bg-white
        pt-24
    `}>
      {/* Text */}
      {text && (
        <View
          className={`
            text-wrapper
            mx-auto
            w-10/12
            rounded-3xl
            bg-white
            px-6
            py-4
            shadow-md
            shadow-purpleDark
            mb-12
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
            w-10/12
            flex-row
            justify-center
            gap-6
            mb-12
          `}>
          {links.map((link: PostLinkType) => (
            <Btn
              key={link.id}
              iconSource={{
                uri: link.icon,
              }}
              onPress={() => {
                // Open link in external browser
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
      {
        imageLink &&
        <View
          className={`
            img-wrapper
            debug
            ${videoLink ? '-mb-52' : '-mb-28'}
            h-96
            w-full
            bg-white
          `}>
          <Image
            source={{
              uri: imageLink,
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          />
        </View>
      }

      {/* Audio player */}
      {audioLink && <Audio audioSrc={audioLink} />}

      {/* Video player */}
      {videoLink && (
        <Video src={videoLink} autoPlay={false} className={`mx-auto !mt-16 !w-11/12`} />
      )}
    </View>
  );
}
