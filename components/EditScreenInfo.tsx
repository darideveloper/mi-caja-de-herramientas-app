// Components
import { View, FlatList, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from './ui/Title';
import Video from './ui/Video';
import Cta from './ui/Cta';
import Btn from './ui/Btn';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const categoriesData = [
    {
      id: 1,
      name: 'Para balancear energía masculina y femenina',
      icon: 'https://mi-caja-de-herramientas.s3-accelerate.amazonaws.com/media/icons/icon-a.png',
    },
    {
      id: 4,
      name: 'Para celebrar/cuando pasa algo bueno',
      icon: 'https://mi-caja-de-herramientas.s3-accelerate.amazonaws.com/media/icons/icon-d.png',
    },
    {
      id: 6,
      name: 'Para conectar con los demás/cuando estoy antisocial',
      icon: 'https://mi-caja-de-herramientas.s3-accelerate.amazonaws.com/media/icons/icon-f.png',
    },
    {
      id: 2,
      name: 'Para dejar de compararte',
      icon: 'https://mi-caja-de-herramientas.s3-accelerate.amazonaws.com/media/icons/icon-b.png',
    },
    {
      id: 5,
      name: 'Para después de hacer ejercicio',
      icon: 'https://mi-caja-de-herramientas.s3-accelerate.amazonaws.com/media/icons/icon-e.png',
    },
    {
      id: 3,
      name: 'Para soltar y dejar ir',
      icon: 'https://mi-caja-de-herramientas.s3-accelerate.amazonaws.com/media/icons/icon-c.png',
    },
  ];

  return (
    <ScrollView>
      <View className="mx-4 mt-2 items-center">
        <Title
          className={`
          `}>
          !Bienvenido!
        </Title>

        <Video
          src={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        />

        <Cta />

        {/* Groups wrapper */}
        <View 
          className={`
            w-full
            py-8
          `}
        >
          <FlatList 
            data={categoriesData}
            renderItem={({ item }) => (
              <Btn
                iconUrl={item.icon}
                title={item.name}
              />
            )}
            className={`
              w-full
            `}
            contentContainerStyle={{ 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
            }}
          />
          <FlatList 
            data={categoriesData}
            renderItem={({ item }) => (
              <Btn
                iconUrl={item.icon}
                title={item.name}
              />
            )}
            className={`
              w-full
            `}
            contentContainerStyle={{ 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
