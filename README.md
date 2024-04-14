# Santex RBI Team - Front End Training Challenge

Quick challenge to help candidates to join RBI Team to catch up with currently used technologies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Goals

- Get familiar with Styled Components as styling strategy
- Get a good understanding of Apollo Client and how to integrate Graphql to a React front end application
- Use Graphql Fragments
- Acquire good practices with Jest and testing both components and hooks
- Review React hooks concepts and develop custom hooks

## Requirements

- Implement a home page with a grid of products that includes product picture, description and price (from any product variant). Hint: use Graphql query.
- Create a "Buy" button for each product in the greed and implement a mutation to update an order everytime a user clicks on that button.
  The mutation is called `addItemToOrder`. Hint: look into the API documentation section of this document
- Implement app header component that includes the subtotal of the current order and persists through page refresh. Hint: use Graphql mutation and Context API
- Add custom hook named `useStateWithStorage` with same API as `useState` hook but adding local storage capabilities. Can be used for header subtotal
- Create tests for grid UI item and other components

## API documentation

Even thought the app is already connected to a graphql endpoint, the trainee can find here all required information about `queries`, `mutations` and Graphql types.

- https://www.vendure.io/docs/graphql-api/shop/

## Scripts

### `yarn start`

Runs the app in the development mode.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `Environment Variables`

To run the project, you need to set up an `environment` variable for the API URL. Follow these steps:

Create a file named `.env` in the root directory of the project.
Add the following line to the `.env` file:

```plaintext
REACT_APP_API_URL=https://readonlydemo.vendure.io/shop-api
```

Replace https://readonlydemo.vendure.io/shop-api with the actual API URL you are using.

## Desktop version
![Prodcts 1](https://github.com/robertocandales/product_list/assets/61159123/c6706e64-87c9-433d-b238-b09dc571740d)
![Prodcts 2](https://github.com/robertocandales/product_list/assets/61159123/d0935e23-0fb6-4ae2-8e64-3bb17c3655fe)

## Mobile version
![Prodcts 1](https://github.com/robertocandales/product_list/assets/61159123/51865b91-8d2e-4135-945d-e8e8c0ee200a) ![Prodcts 2](https://github.com/robertocandales/product_list/assets/61159123/8cfdf9e9-2f38-40d4-a3a9-e157cdf66767)




