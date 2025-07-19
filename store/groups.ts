import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the category type
interface Group {
  id: number;
  name: string;
  icon: string;
}

// Save groups to AsyncStorage
export async function setGroups(groups: Group[]): Promise<void> {
  groups
  // Validtse json content before save
  const contentLength = groups.length;
  if (contentLength === 0) {
    console.error('Error: Groups array is empty.');
    return;
  }

  // Validate keys before save
  const keys = Object.keys(groups[0]);
  const expectedKeys = ['id', 'name', 'icon'];
  const isValid = expectedKeys.every((key) => keys.includes(key));
  if (!isValid) {
    console.error('Error: Groups array contains invalid keys.');
    return;
  }


  const groupsString = JSON.stringify(groups);
  await AsyncStorage.setItem('groups', groupsString);
}

// Retrieve categories from AsyncStorage
export async function getGroups(): Promise<Group[] | null> {
  const groupsString = await AsyncStorage.getItem('groups');
  return groupsString ? JSON.parse(groupsString) : null;
}

// Clear categories from AsyncStorage
export async function clearGroups(): Promise<void> {
  await AsyncStorage.removeItem('groups');
}
