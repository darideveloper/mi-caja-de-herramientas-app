// Hooks
import { useState, useEffect } from 'react';

// Components
import { View } from 'react-native';
import Btn from '../ui/Btn';
import Text from '../ui/Text';
import { ActivityIndicator } from 'react-native';

// Libs
import { fetchData } from '../../lib/api';

// Add interface for category data
interface Category {
  id: number;
  name: string;
  icon: string;
}

export default function CategoryButtons() {
  // Fix useState type
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);

  useEffect(() => {
    // Update categories data with api data
    fetchData('groups').then((data) => {
      const typedData = data as Category[];
      setCategoriesData(typedData);
    });
  }, []);

  return (
    <View
      className={`
        flex
        min-h-72
        w-full
        flex-col
        items-center
        justify-center
        gap-4
        py-8
      `}>
      {categoriesData.length === 0 ? (
        <ActivityIndicator 
          size="large"
          color="#ffffff"
        />
      ) : (
        categoriesData.map((category) => (
          <Btn key={category.id} iconSource={{ uri: category.icon }} onPress={() => alert('click')}>
            <Text
              className={`
                w-11/12
              `}>
              {category.name}
            </Text>
          </Btn>
        ))
      )}
    </View>
  );
}
