// Hooks
import { useState, useEffect } from 'react';

// Components
import { View } from 'react-native';
import Btn from '../ui/Btn';
import Text from '../ui/Text';
import { ActivityIndicator } from 'react-native';

// Libs
import { fetchData } from '../../lib/api';
import { getCategories, setCategories } from '../../store/categories'; // Import category storage functions
import { useNavigation } from '@react-navigation/native';


// Add interface for category data
interface Category {
  id: number;
  name: string;
  icon: string;
}

export default function CategoryButtons() {

  // States
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Navigation
  const navigation = useNavigation<any>();

  useEffect(() => {

    /**
     * Load categories from AsyncStorage or API
     */
    const loadCategories = async () => {
      try {
        // Try to get categories from AsyncStorage
        const storedCategories = await getCategories();
        if (storedCategories && storedCategories.length > 0 && storedCategories != undefined) {
          console.log('Categories loaded from AsyncStorage:', storedCategories);
          setCategoriesData(storedCategories);
          setIsLoading(false);
        } else {
          // Fetch categories from API if not in AsyncStorage
          const data = await fetchData('groups');
          const typedData = data as Category[];
          setCategoriesData(typedData);
          await setCategories(typedData); // Save categories to AsyncStorage
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
        setIsLoading(false);
      }
    };

    // Load categories when the component mounts
    loadCategories();
  }, []);

  useEffect(() => {
    console.log('Categories data:', categoriesData);
  }, [categoriesData]);

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
      {(isLoading || !categoriesData || categoriesData == undefined || categoriesData.length === 0) ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        categoriesData.map((category) => (
          <Btn 
            key={category.id}
            iconSource={{ uri: category.icon }} 
            onPress={() => {
              navigation.navigate("Results", {
                categoryId: category.id,
                title: category.name,
              });
            }}
          >
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
