import { fetch, FetchRequestInit } from 'expo/fetch';
import { getAccessToken } from 'store/tokens';

/**
 * Fetches data from the API using the stored access token
 *
 * @param {string} endpoint - The API endpoint to fetch data from
 * @returns {Promise<void>} Nothing
 */
export async function fetchData(endpoint: string, appendSlash: boolean = true): Promise<object[]> {
  try {
    
    // Wait until access token its ready
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
    if (appendSlash) {
      fullEndpoint += '/'
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

/**
 * Returns the absolute URL for a resource
 * 
 * @param {string | null | undefined} url - The URL to normalize
 * @returns {string} The absolute URL
 */
export function getAbsoluteUrl(url: string | null | undefined): string {
  if (!url) return '';
  
  // If already absolute or a base64 string, return it as is
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  
  // Handle protocol-relative URLs
  if (url.startsWith('//')) return `https:${url}`;
  
  // Get base URL from env and remove /api if present at the end
  const apiBase = process.env.EXPO_PUBLIC_API_BASE || '';
  const domain = apiBase.replace(/\/api\/?$/, '');
  
  // Ensure url starts with /
  const path = url.startsWith('/') ? url : `/${url}`;
  
  return `${domain}${path}`;
}
