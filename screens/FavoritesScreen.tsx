// Layout
import RootLayout from 'layouts/RootLayout';

// Components

import Title from 'components/ui/Title';


export default function FavoritesScreen() {  

  return (
    <RootLayout>
      <Title
        className={`
          text-white
          h-40
        `}
      >
        Próximamente
      </Title>      
    </RootLayout>
  );
};
