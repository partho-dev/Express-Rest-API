## Make some notes about Express 

- Here I would be updating the information, concepts about APIs

## GrapghQL API
- TypeDefs - It defines the shapes of the data available in the GraphQL API, They specify the types of `objects` that can be queries
& relation between these data 
- Resolvers (It communicates with Backend to get the data)

## Graphql Architecture
<img width="1378" alt="graphQl-Arch" src="https://github.com/user-attachments/assets/03fa50ad-6de6-4e72-b1c6-f7e62e872e19">



### Keywords
- Query : `query` (Its equivalent to Get Request in REST)
- Mutation : `mutations` (Its equivalent to POST, DELETE, PUT in REST)


### What GraphQL solves the problem 
- Rest API creates different end points and client request to the end points and get all the data available
- This is a wstage of resource on server and increases the bottleneck on the application
- GraphhQl solved it by letting the client request to only one endpoint /grapghql and request for the  data that is needed

### Dependancies of GrapghQL - Backend
```
npm install express express-session graphql @apollo/server @graphql-tools/merge bcryptjs connect-mongodb-session dotenv graphql-passport passport mongoose
```

### Frontend Dependancy
```
npm install graphql @apollo/client react-router-dom react-icons react-hot-toast tailwind-merge @tailwindcss/aspect-ratio clsx chart.js react-chartjs-2 mini-svg-data-uri framer-motion
```

