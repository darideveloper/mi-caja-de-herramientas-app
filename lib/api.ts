import { fetch, FetchRequestInit } from 'expo/fetch';
import { refreshTokens, loginGuest } from 'lib/auth';
import { getAccessToken } from 'store/tokens';

/**
 * Fetches data from the API using the stored access token
 *
 * @param {string} endpoint - The API endpoint to fetch data from
 * @returns {Promise<object[]>} The fetched data
 */
export async function fetchData(endpoint: string, appendSlash: boolean = true): Promise<object[]> {
  try {
    // Wait until access token its ready
    let accessToken = '';
    while (true) {
      accessToken = (await getAccessToken()) || '';
      if (accessToken !== '') {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${accessToken}`);

    const requestOptions: FetchRequestInit = {
      method: 'GET',
      headers: myHeaders,
    };

    let fullEndpoint = `${process.env.EXPO_PUBLIC_API_BASE}/${endpoint}`;
    if (appendSlash) {
      fullEndpoint += '/';
    }
    let response = await fetch(fullEndpoint, requestOptions);
    console.log({ fullEndpoint, response });
    let jsonData = await response.json();

    // If token is expired, attempt to refresh and retry once
    if (response.status === 401 && jsonData.data?.code === 'token_not_valid') {
      console.log('Token expired, refreshing...');
      let refreshResult = await refreshTokens();

      if ('status' in refreshResult && (refreshResult as { status: number }).status !== 200) {
        console.log('Failed to refresh token, attempting guest login fallback...');
        refreshResult = await loginGuest();

        if ('status' in refreshResult && (refreshResult as { status: number }).status !== 200) {
          console.error('Guest login fallback failed');
          return [];
        }
      }

      // Retry with new token
      accessToken = (await getAccessToken()) || '';
      myHeaders.set('Authorization', `Bearer ${accessToken}`);
      response = await fetch(fullEndpoint, requestOptions);
      jsonData = await response.json();
    }

    // Get results only if is required
    let results = [];
    if (jsonData.results !== undefined) {
      results = jsonData.results;
    } else {
      results = jsonData;
    }
    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
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
