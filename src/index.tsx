import { ApolloProvider } from '@apollo/client/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { OrderProvider } from './store/orderProvider';
import { client } from './graphql/client';

ReactDOM.render(
  <React.StrictMode>
    <OrderProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </OrderProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
