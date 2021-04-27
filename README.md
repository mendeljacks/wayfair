## Wayfair Connector

The Wayfair API provides a set of actions allowing suppliers, carriers, and all sorts of other users and application to seamlessly integrate with Wayfair.

This package wraps the official Wayfair API.

In order to use the Wayfair API, a client_id and client_secret 
can be obtained by registering an application on the wayfair portal.

## Installation
```
npm i wayfair  // Or yarn add wayfair
```

## Obtain a client id and client secret from wayfair portal
The auth object is required to be provided for every request, and
tokens will automatically be refreshed when they expire.
```js
const auth = {
    client_id: 'your_client_id_here',
    client_secret: 'your_client_secret_here'
}
```
