import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App';
import './i18n';
import './font-awesome'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

export const grapqhQlClient = new ApolloClient({
   uri: '/graphql'
});

ReactDOM.render(
   <ApolloProvider client={grapqhQlClient}>
      <App />
   </ApolloProvider>,
   document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
