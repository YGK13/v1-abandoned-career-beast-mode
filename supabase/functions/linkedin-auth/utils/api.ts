
/**
 * Helper function to handle fetch requests with error logging
 */
export async function fetchWithErrorHandling(url, options) {
  try {
    const response = await fetch(url, options);
    const responseText = await response.text();
    
    logApiResponse(url, response.status, responseText);
    
    const parsedResponse = parseResponseData(responseText, url);
    
    if (!response.ok) {
      handleApiError(url, parsedResponse);
    }
    
    return parsedResponse;
  } catch (e) {
    console.error(`Network error with ${url}:`, e);
    throw new Error(`Request to ${url} failed: ${e.message}`);
  }
}

/**
 * Log API response for debugging
 */
function logApiResponse(url, status, responseText) {
  console.log(`Response status from ${url}: ${status}`);
  console.log(`Raw response: ${responseText.substring(0, 500)}${responseText.length > 500 ? '...' : ''}`);
}

/**
 * Parse response text to JSON
 */
function parseResponseData(responseText, url) {
  try {
    return JSON.parse(responseText);
  } catch (e) {
    console.error(`Error parsing response from ${url}:`, e);
    throw new Error(`Invalid response from ${url}: ${responseText}`);
  }
}

/**
 * Handle API error responses
 */
function handleApiError(url, parsedResponse) {
  console.error(`API error from ${url}:`, parsedResponse);
  throw new Error(`API request failed: ${JSON.stringify(parsedResponse)}`);
}
