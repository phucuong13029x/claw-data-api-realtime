export default {
  async fetch(request) {
    const url = new URL(request.url);
    const destination = url.searchParams.get("dest");

    try {
      const response = await fetchWithEndpoint(destination);
      return response;
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};

// Custom fetch function to handle API calls
async function fetchWithEndpoint(destination) {
  const apiUrl = `${destination}`;

  try {
    // Make a fetch request with custom headers
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Referer": "https://google.com.vn",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36",
        "Accept": "application/json",
      },
    });
    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    // Parse the JSON response
    const data = await response.json();
    // Return the parsed JSON as a response
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle errors during fetch
    throw new Error(`Fetch error: ${error.message}`);
  }
}
