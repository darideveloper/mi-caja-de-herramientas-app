// Components
import { View, Image } from 'react-native';
import Title from '../../ui/Title';
import Text from '../../ui/Text';
import Btn from '../../ui/Btn';

type linkType = {
  id: number;
  name: string;
  icon: string;
  url: string;
};


export default function PostBody() {
  // Dummy data
  const text: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, esseLorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, esseLorem ipsum dolor sit amet consectetur adipisicing elit. Molestias`;
  const links: linkType[] = [
    {
      id: 1,
      name: 'Instagram',
      icon: 'http://192.168.0.8:8000/media/icons/instagram.png',
      url: 'https://www.instagram.com/paocarrera.biocoach?igsh=eWtvbHNsM3FwZW1z',
    },
    {
      id: 2,
      name: 'Youtube',
      icon: 'http://192.168.0.8:8000/media/icons/youtube.png',
      url: 'https://youtube.com/@paocarrera.biocoach?si=TCHx5x-BVE3hfN6r',
    },
  ];

  // Media links
  const imageLink = 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s';
  const audioLink =
    'https://filebrowser.apps.darideveloper.com/api/public/dl/AmO1UWL8/file_example_MP3_5MG.mp3';
  const videoLink =
    'https://filebrowser.apps.darideveloper.com/api/public/dl/XnqqyRiO/test/test.wav';

  return (
    <View
      className={`
        body
        -z-10
        -mt-12
        mb-96
        pt-24
        h-96
        bg-white
    `}>

      {/* Text */}
      {
        text
        &&
        <View
          className={`
            text-wrapper
            w-10/12
            mx-auto
            shadow-md
            shadow-purpleDark
            rounded-3xl
            bg-white
            px-6
            py-4
          `}
        >
          <Text
            className={`
              text-xl
              text-black
              text-center
            `}
          >
            {text}
          </Text>
        </View>
      }

        
      {/* Links */}
      {
        links.length > 0
        &&
        <View
          className={`
            links-wrapper
            w-10/12
            mx-auto
            flex-row
            justify-center
            gap-6
            mt-6
          `}
        >
          {
            links.map((link: linkType) => (
              <Btn 
                key={link.id}
                iconSource={{
                  uri: link.icon,
                }}
                onPress={() => {
                  alert(link.url);
                }}
                className={`
                  link
                  w-14
                  h-14
                `}
                classNameIcon={`
                  w-14
                  h-14
                `}
              />  
            ))
          }
        </View>
      }

      {/* Image */}
      <View
        className={`
          img-wrapper
          debug
          h-96
          w-full
          mt-12
          bg-white
        `}
      >
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
    </View>
  );
}
