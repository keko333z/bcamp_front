import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, BrowserRouter } from 'react-router-dom';

import { 
    ApolloClient, ApolloProvider, HttpLink, InMemoryCache
  } from '@apollo/client' 
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: '/graphql',
    })
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
    <HashRouter>
    <App />
    </HashRouter>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
