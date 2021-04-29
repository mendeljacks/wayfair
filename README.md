## Wayfair Connector
This package wraps the official Wayfair API for use in NodeJS and the browser.
Code generation has been used to ensure Typescript support and API completeness.

The Wayfair API provides a set of actions allowing suppliers, carriers, and 
users to integrate with Wayfair. To begin, a client_id and client_secret 
can be obtained by registering an application with the wayfair portal.

## Installation
```
npm i wayfair  // Or yarn add wayfair
```

## Authentication
The auth object is required to be provided for every request, and
tokens will automatically be refreshed when they expire.
```js
const auth = {
    client_id: 'your_client_id_here',
    client_secret: 'your_client_secret_here',
    base_url: 'https://api.wayfair.com/v1/graphql' // Or https://sandbox.api.wayfair.com/v1/graphql
}
```

## Execute Queries
Pass an auth object as the first param, and a json representation of the
graphql for the second param. (see npm json-to-graphql-query for more info).

The response is the unmodified json from the graphql request.
```js
import {wayfair} from 'wayfair'

const response = await wayfair.query_applications(auth, { 
    __args: { limit: 2 }, 
    clientId: true 
})

console.log(response.data.applications) // [{clientId: '...'}, {clientId: '...'}]
```