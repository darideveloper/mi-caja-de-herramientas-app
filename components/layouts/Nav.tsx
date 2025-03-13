// Components
import Btn from '../ui/Btn';
import Title from '../ui/Title';
import { View } from 'react-native';

// Libs
import { useNavigation } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';


export default function Nav() {
  
  // Navigation buttons
  const buttons = ['Home', 'Favorites'];
  const navigation = useNavigation<any>();
  const currentRoute = useNavigationState(state => state?.routes[state.index]?.name ?? 'Home');

  return (
    <View
      className={`
        absolute
        bg-purple
        bottom-0
        left-0
        flex
        flex-row
        justify-center
        items-center
        w-full
        px-6
        rounded-t-xl
      `}
    >
      {
        buttons.map((button, index) => (
          <View
            key={index}
            className={`
              btn-wrapper
              flex
              flex-1
              justify-center
              items-center
              py-4
            `}
          >
            <Btn 
              className={`
                text-center
                bg-purpleDark
                py-1
                w-11/12
              `}
              variant='dark'
              onPress={() => navigation.navigate(button)}
              disabled={currentRoute === button}
            >
              <Title
                className={`
                  !my-0
                  !text-xl
                  !font-normal
                  text-white
                `}
                variant='dark'
              >
                {button}
              </Title>
            </Btn>
          </View>
        ))
      }
    </View>
  )
}
