const config = {
  REACT_APP_API_ENDPOINT: process.env.API_ENDPOINT || 'http://localhost:8000/api',
  API_KEY: process.env.REACT_APP_API_KEY,
  GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
}

export default config;