// get server url for api requests
// ex -> axios.post(serverUrl('/register'))
export const serverUrl = (url) => {
  const _url = new URL(
    import.meta.env.VITE_SERVER_URL ?? "http://localhost:3001"
  );
  _url.pathname = url;
  return _url.href;
};
