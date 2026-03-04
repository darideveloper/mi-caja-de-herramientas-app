import React from 'react';
import { ScrollView } from 'react-native';

// Layout
import RootLayout from 'layouts/RootLayout';

// Components
import Title from 'components/ui/Title';
import Header from '../components/layouts/Header';

export default function FavoritesScreen() {  
  return (
    <RootLayout>
      <ScrollView className="w-full">
        <Header screenName="Favorites" />
        <Title
          className={`
            text-white
            h-40
          `}
        >
          Próximamente
        </Title>
      </ScrollView>
    </RootLayout>
  );
};
