import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the category type
interface Category {
  id: number;
  name: string;
  icon: string;
}

// Save categories to AsyncStorage
export async function setCategories(categories: Category[]): Promise<void> {
  const categoriesString = JSON.stringify(categories);
  await AsyncStorage.setItem('categories', categoriesString);
}

// Retrieve categories from AsyncStorage
export async function getCategories(): Promise<Category[] | null> {
  const categoriesString = await AsyncStorage.getItem('categories');
  return categoriesString ? JSON.parse(categoriesString) : null;
}

// Clear categories from AsyncStorage
export async function clearCategories(): Promise<void> {
  await AsyncStorage.removeItem('categories');
}