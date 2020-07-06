# Site: https://marta-rail.vercel.app/ 

## Motivation: 
This project was a way for me to practice my React.js skills. It is a fairly simple frontend implementation, but the backend is what challenged me the most. The official MARTA api does not implement CORS which means I couldn't just make an api call and parse the results from React. After doing some research, the only reliable way to fix this was to create my own proxy api which would make the call to the official MARTA api with appropriate CORS headers. After some failed attempts with Node.js and Express, I finally got it to work and had the api deployed to: [Marta Rail Api](https://martarail-api.vercel.app/).
## Frameworks Used:
- React.js
- Semantic UI for CSS
- Node.js
- Express.js
## Deployed using: https://vercel.com/
