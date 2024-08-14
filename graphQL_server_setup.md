## Basic server setup of GraphQL

- We will use typescript
- initialise a node server with `npm init`
- Add typescript - `npm i -D typescript`
- install express - `npm i express`
- initialise the typescript - `npx tsc --init`
- create a `src` folder on root
- configure the typescript - 
- give the root folder which needs to be compiled 
```
   "module": "commonjs", /* Specify what module code is generated. */
    "rootDir": "./src", 
```
- give the destination folder where the build will be stored 
```
change from    
//"outDir": "./", 
to 
"outDir": "./build", 
```

-  create express server `src/server.ts`
- For that, install type of express - `npm i -D @types/express`

- We would need to compile the source code  - `npm i tsc-watch -D`
- This will watch the change in source code and create the build or dist folder
- now, create the script  - `"dev" : "tsc-watch"`
- Execute the command - `npm run dev`
- This will create a folder `build/server.js`
- Now to run our swerver, we have to use - `node build/server.js` by cancelling our previous execution of `npm run dev`

- To make them automated - compile the code & then run the server, we have to create a script accordingly
```
  "scripts": {
    "start" : "node build/server.js",
    "dev" : "tsc-watch --onSuccess \"npm start\""
  }
```
- Now, we just need to run one script `npm run dev`
- This will run the express, now need to setup apollo grapgh QL server

## Setup apollo graphql server on Express
- install apollo server `npm install @apollo/server graphql`

