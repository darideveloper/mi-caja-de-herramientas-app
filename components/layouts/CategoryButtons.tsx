import { View } from 'react-native';
import Btn from '../ui/Btn';


export default function CategoryButtons() {

  // Dummy data
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
    <View 
      className={`
        w-full
        py-8
        flex
        flex-col
        items-center
        justify-center
        gap-4
      `}
    >
      {
        categoriesData.map((category) => (
          <Btn
            key={category.id}
            iconUrl={category.icon}
            title={category.name}
          />
        ))
      }
    </View>
  )
}
