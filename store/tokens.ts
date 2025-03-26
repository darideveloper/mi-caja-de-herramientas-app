import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setAccessToken(accessToken: string): Promise<void> {
  return AsyncStorage.setItem('accessToken', accessToken);
}

export async function getAccessToken(): Promise<string | null> {
  return AsyncStorage.getItem('accessToken'); 
}

export async function setRefreshToken(refreshToken: string): Promise<void> {
  return AsyncStorage.setItem('refreshToken', refreshToken); 
}

export async function getRefreshToken(): Promise<string | null> {
  return AsyncStorage.getItem('refreshToken'); 
}