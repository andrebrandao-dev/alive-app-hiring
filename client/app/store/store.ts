import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import searchslicer from './searchSlice';
import quoteSlice from './quoteSlice';
import historySlice from './historySlice';
import gainLossSlice from './gainLossSlice';
import appSlice from './appSlice';

const initalState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  app: appSlice,
  search: searchslicer,
  quote: quoteSlice,
  history: historySlice,
  gainLoss: gainLossSlice,
});

export const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);