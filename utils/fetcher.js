async function fetcherGetUser(url, token, signal = null) {
  const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  });
  if (!response.ok) {
    // TODO: Create a better error message for fetching error
    throw new Error(response.status);
  }
  const sites = await response.json();
  return sites;
}

export default fetcherGetUser;
