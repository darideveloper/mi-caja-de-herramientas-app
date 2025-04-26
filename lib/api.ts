import { fetch, FetchRequestInit } from 'expo/fetch';
import { getAccessToken } from 'store/tokens';

/**
 * Fetches data from the API using the stored access token
 *
 * @param {string} endpoint - The API endpoint to fetch data from
 * @returns {Promise<void>} Nothing
 */
export async function fetchData(endpoint: string): Promise<object[]> {
  try {
    const myHeaders = new Headers();
    const accessToken = await getAccessToken()
    myHeaders.append('Authorization', `Bearer ${accessToken || ''}`);

    const requestOptions: FetchRequestInit = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/${endpoint}/`, requestOptions);
    const jsonData = await response.json();

    // Get resuluts only if is required
    let results = [];
    if (jsonData.results != undefined) {
      results = jsonData.results;
    } else {
      results = jsonData;
    }
    return results
  } catch (error) {
    console.error('Error fetching data:', error);
    return []
  }
}
