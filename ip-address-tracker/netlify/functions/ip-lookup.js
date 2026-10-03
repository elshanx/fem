exports.handler = async (event) => {
  const apiKey = process.env.IPIFY_API_KEY;
  const ipAddress = event.queryStringParameters?.ipAddress;

  const url = new URL('https://geo.ipify.org/api/v2/country,city');
  url.searchParams.set('apiKey', apiKey);
  if (ipAddress) {
    url.searchParams.set('ipAddress', ipAddress);
  }

  const response = await fetch(url);
  const body = await response.text();

  return {
    statusCode: response.status,
    headers: { 'Content-Type': 'application/json' },
    body,
  };
};
