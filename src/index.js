import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';

import { 
    ApolloClient, ApolloProvider, HttpLink, InMemoryCache
  } from '@apollo/client' 
import { UserProvider } from './contexts/userContext';
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://nodeapp-cifz.onrender.com/graphql',
    })
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
    <HashRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </HashRouter>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
