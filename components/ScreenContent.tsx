import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  
  const insets = useSafeAreaInsets();
  
  return (
    <View  
      className={`
        bg-purple
        text-black
      `}
      style={{paddingTop: insets.top}}
    >
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
const styles = {
  container: ``,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
