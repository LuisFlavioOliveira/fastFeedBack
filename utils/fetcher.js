async function fetcher(url, signal = null) {
  const response = await fetch(url);
  if (!response.ok) {
    // TODO: Create a better error message for fetching error
    throw new Error(response.status);
  }
  const sites = await response.json();
  return sites;
}

export default fetcher;
