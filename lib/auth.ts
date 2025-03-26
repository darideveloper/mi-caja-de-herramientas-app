import { fetch, FetchRequestInit } from 'expo/fetch';
import { setAccessToken, setRefreshToken } from 'store/tokens';

interface TokenData {
  refresh: string;
  access: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: TokenData;
}

/**
 * Login with guest user and password*
 * 
 * @returns {Promise<ApiResponse | { status: number }>}
 */
export async function loginGuest(): Promise<ApiResponse | { status: number }> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    username: process.env.EXPO_PUBLIC_API_GUEST_USER,
    password: process.env.EXPO_PUBLIC_API_GUEST_PASS,
  });

  const requestOptions: FetchRequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  // Get tokens dnd validate response
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/token/`, requestOptions);
  if (response.status !== 200) {
    return { status: response.status };
  }

  // Get tokens
  const jsonData = await response.json();

  // Update tokens
  setAccessToken(jsonData.data.access);
  setRefreshToken(jsonData.data.refresh);

  // Return data
  return jsonData as ApiResponse;
}

