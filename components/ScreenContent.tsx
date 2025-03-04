import { Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View 
      className={`
        items-center
        flex-1
        justify-center
        bg-purple
        text-black
      `}
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
