import { fetch, FetchRequestInit } from 'expo/fetch';
import { getAccessToken } from 'store/tokens';

/**
 * Fetches data from the API using the stored access token
 *
 * @param {string} endpoint - The API endpoint to fetch data from
 * @returns {Promise<void>} Nothing
 */
export async function fetchData(endpoint: string, backstask: boolean = true): Promise<object[]> {
  try {
    
    // Wait until acess token its ready
    let accessToken = '';
    while (true) {
      accessToken = await getAccessToken() || '';
      if (accessToken != '') {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log({accessToken, endpoint})
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${accessToken}`);
    
    const requestOptions: FetchRequestInit = {
      method: 'GET',
      headers: myHeaders,
    };

    let fullEndpoint = `${process.env.EXPO_PUBLIC_API_BASE}/${endpoint}`;
    if (backstask) {
      fullEndpoint += '\\'
    }
    const response = await fetch(fullEndpoint, requestOptions);
    console.log({response})
    const jsonData = await response.json();

    // Get resuluts only if is required
    let results = [];
    if (jsonData.results != undefined) {
      results = jsonData.results;
    } else {
      results = jsonData;
    }
    console.log({endpoint, results})
    return results
  } catch (error) {
    console.error('Error fetching data:', error);
    return []
  }
}
