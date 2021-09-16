export const apiUrl 
    = process.env.NODE_ENV !== 'production' 
        ? 'https://twitter-app-api.herokuapp.com'
        : 'http://localhost:5000' 