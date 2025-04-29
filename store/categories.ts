import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the category type
interface Category {
  id: number;
  name: string;
  icon: string;
}

// Save categories to AsyncStorage
export async function setCategories(categories: Category[]): Promise<void> {

  // Validtse json content before save
  const contentLength = categories.length;
  if (contentLength === 0) {
    console.error('Error: Categories array is empty.');
    return;
  }

  // Validate keys before save
  const keys = Object.keys(categories[0]);
  const expectedKeys = ['id', 'name', 'icon'];
  const isValid = expectedKeys.every((key) => keys.includes(key));
  if (!isValid) {
    console.error('Error: Categories array contains invalid keys.');
    return;
  }


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