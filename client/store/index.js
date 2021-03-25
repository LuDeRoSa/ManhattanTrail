import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import rest from './rest';
import quiz from './quiz';
import game from './game';
import pastgames from './pastgames';

import favorites from './favorites';

const reducer = combineReducers({
  auth,
  rest,
  game,
  pastgames,
  quiz,
  favorites,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

// export const getToken = () => window.localStorage.getItem('token');

export default store;
export * from './auth';
