// Components
import Btn from '../ui/Btn';
import Title from '../ui/Title';
import { View } from 'react-native';

// Libs
import { useNavigation } from '@react-navigation/native';
import { usePlatformSafeArea } from '../../lib/safeArea';

interface NavProps {
  currentRoute?: string;
}

export default function Nav({ currentRoute = 'Home' }: NavProps) {
  
  // Navigation buttons
  const buttons = ['Home', 'Favorites'];
  const navigation = useNavigation<any>();
  const { getBottomPadding } = usePlatformSafeArea();

  return (
    <View
      className={`
        absolute
        bg-purpleDark
        bottom-0
        left-0
        flex
        flex-row
        justify-center
        items-center
        w-full
        px-6
        rounded-t-xl
        shadow-lg
      `}
      style={{
        paddingBottom: getBottomPadding(2), // Minimal padding
      }}
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
              py-3
            `}
          >
            <Btn 
              className={`
                text-center
                py-1
                w-11/12
              `}
              variant={currentRoute !== button ? 'purple' : 'dark'}
              onPress={() => navigation.navigate(button)}
              disabled={false}
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
