## Explain how the data flow in GraphQL

- <img width="1378" alt="graphQl-Arch" src="https://github.com/user-attachments/assets/03fa50ad-6de6-4e72-b1c6-f7e62e872e19">

- On the above example, I tried to relate that with a Blog site.

- Lets take an example of an `E-Commerce` application where the client(Browser or App) is expecting the list of products from the server

- In this example, we will see the end to end flow and how each components in the GraphQL servers do their part of Job

- Before that, lets understand what are the components in the architecture

    - Schema Layer 
        - define the type (if its `Query` or `Mutation`)
        - `Query` is equivalent to GET method in REST 
        - `Mutation` is equivalent to modifying like usage of `POST`, `PUT` & `DELETE` method in REST

    - Resolver Layer
        - role of resolvers in fetching the data based on the schema and client query
        - This layer is good place for error handling
        - Authentication/Authorization happens in this layer

    - Service Layer
        - This layer handles business logic and interaction with the DAO (Data Access Object) layer. This separation of concerns is a good practice to make the code moodular.
        - This layer is also important to connect with other upstream API like 3rd party API which can be REST API or Database
        - This layer is good place for error handling 

    - DAO Layer (Data Access Object Layer)
        - This is basically the layer of ORM which helps or takes the request from the service layer and communicates with the Database to GET(Query) or POST(Mutate) the data

    - Database
        - This stored or perform the CRUD 


### Putting the entire data flow 

1. Browser Sends a Query
- Component: `Client/Front-End`
- Action: The browser (client) sends a GraphQL query to the server, requesting a list of products.
- Example query:
- GQL format
```
        query {
          fetchProducts {
            id
            name
            price
            inStock
          }
        }
```
- Here, the client is using a declaritive way of sending the query which is specific to graphQl (GQL - Graph Query Language)

2. Request Reaches the GraphQL Endpoint
- Component: `Schema Layer`
- Action: The request hits the GraphQL endpoint (e.g., `/graphql`).
- The schema layer is responsible for validating the structure of the incoming query against the defined schema.
- The schema for the Product type look like this
- GQL format 
```
        type Product {
          id: ID!
          name: String!
          price: Float!
          inStock: Boolean!
        }

        type Query {
          fetchProducts: [Product]
        }
```

3. Resolver Matches the Query
- Component: `Resolver Layer`
- Action: The GraphQL server identifies the resolver function associated with the `fetchProducts` query. (`The name of the query the client sends`)
- The resolver is responsible for retrieving the data corresponding to the query. It acts as the bridge between the GraphQL schema and the data source(Database or 3rd party API).
- javascript format (Object)
```
        const resolvers = {
          Query: {
            fetchProducts: async () => {
              return await productService.getAllProducts(); // Its the function of service on next stage
            },
          },
        };
```

4. Business Logic Executed
- Component: `Service Layer`
- Action:
- The resolver calls the appropriate service method (productService.getAllProducts()).
- The service layer handles business logic, data transformations, and interacts with the Data Access Object (DAO) layer.
- The service layer may also integrate with upstream 3rd party REST APIs if needed, depending on the architecture.
- For example, if product prices need to be fetched from a 3rd party API, the service layer would handle that request.
- javascript format (Object)

```
    const getAllProducts = async () => {
      // Fetch data from  database
      const products = await productDAO.fetchProductsFromDB();

       // Optionally, fetch additional data from a 3rd party API
      const externalData = await axios.get('https://api.thirdparty.com/products');
              
      // Combine and return the data
    return mergeData(products, externalData);
     };
```

5. Data Retrieved from the Database
- Component: `DAO Layer (Data Access Object Layer)`
- Action:
- The service layer interacts with the DAO layer to retrieve data from the database.
- The DAO layer abstracts the data source, whether it's a SQL/NoSQL database, making the service layer unaware of the underlying data fetching details.
- Tools like Mongoose, Sequelize, or Prisma are used to connect and query the database.
- javascript format (Object)

```
        const fetchProductsFromDB = async () => {
          return await ProductModel.find(); // Using Mongoose
        };
```

6. Data Returned to the Resolver
- Component: `Service Layer / Resolver Layer`
- Action:
- The data fetched from the database (and optionally from 3rd party APIs) is returned back through the service layer to the resolver.
- The resolver then structures the data according to the GraphQL schema and returns it to the GraphQL engine.


7. Response Sent to the Client
- Component: `GraphQL Server / Client`
- Action:
- The GraphQL server packages the response according to the GraphQL specification and sends it back to the client.
- JSON Response
```
        {
          "data": {
            "fetchProducts": [
              {
                "id": "1",
                "name": "Product A",
                "price": 29.99,
                "inStock": true
              },
              {
                "id": "2",
                "name": "Product B",
                "price": 49.99,
                "inStock": false
              }
            ]
          }
        }
```
- Handling 3rd Party REST API Integrations
- Responsibility: `Service Layer`
- Details:
- The service layer is typically responsible for making calls to upstream 3rd party REST APIs if needed.
- For example, if you need to fetch exchange rates, product reviews, or shipping rates from a 3rd party service, the service layer would handle these API calls and incorporate the data into the response.

8. Client Receives the Response
- Component: `Client/Front-End`
- Action:
- The client receives the structured data as per the query.
- The data is then rendered on the front-end, possibly updating the UI with the list of products.

### Now, how the client knows that they have to send the request as GQL format or REST format
- In one line, this depends upon the API integration with the backend end, Lets explain that below.
- GraphQL `Clients` for `GQL`: When using a GraphQL API, `libraries` like `Apollo` or `Relay` guide the client in sending GQL requests.
- REST Clients for REST: When using a REST API, standard HTTP libraries like `fetch or axios` guide the client in sending requests as URIs to endpoints.

1. Integration and Setup in the Frontend:
- `GraphQL API Integration`: 
    - When using a GraphQL API, the frontend is typically configured to interact with the GraphQL server using libraries like Apollo Client or Relay. 
    - These libraries are designed to send requests in the GraphQL query language (GQL) format.
- Apollo Client Example:
- javascript format 
```
    import { gql } from '@apollo/client';

    const GET_PRODUCTS = gql`
      query {
        fetchProducts {
          id
          name
          price
          inStock
        }
      }
    `;
```
- Here, the client sends the query in GQL syntax to the GraphQL endpoint (usually /graphql), and the server processes it as a GraphQL request.

- `REST API Integration`:
    - When using a REST API, the frontend makes HTTP requests using methods like GET, POST, PUT, or DELETE to specific URIs.
    - Fetch Example:
    - javascript format (Object)

```
    fetch('/api/products')
      .then(response => response.json())
      .then(data => console.log(data));
``` 
- Here, the client sends a request to the REST endpoint (e.g., /api/products), and the server processes it as a RESTful request.

2. Configuration and Client Awareness:
`Client-Side Configuration`:
- During development, we configure the frontend to interact with either a GraphQL or REST API depending on the design of the application.
- For framework like Next.js, it may need a set up specific pages or API routes that handle these requests differently.

- GraphQL vs. REST in Frontend:
    - `GraphQL Integration`: The client (e.g., a React component) knows to send a GraphQL request because it uses a GraphQL client library like Apollo or Relay.
    - `REST Integration`: The client uses standard HTTP methods and URIs, usually via fetch, axios, or similar libraries, to interact with the backend.

3. How the Client Decides?
- `Framework and Tooling`: 
    - The tools and frameworks used in the frontend are designed to work with either GraphQL or REST, and this dictates the request format.
    - For example, when we use `Apollo Client`, it's set up specifically to communicate with a GraphQL server.
    - but, when using standard HTTP clients like `fetch or axios`, it uses interacting with REST APIs.

- `API Documentation`: The API documentation provided to developers will specify the type of API (GraphQL or REST) and the format in which requests should be made.
- Integration Points in the Codebase:
    - When we write frontend code, we decide initially whether to interacting with a REST API or a GraphQL API based on the endpoints and libraries.
    - Example in Next.js:
    - for GraphQL, we have a dedicated file or module that handles GraphQL queries and mutations.
    - but when we use REST, the API requests with specific HTTP methods and routes.