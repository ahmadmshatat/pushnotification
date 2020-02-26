import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';

const configureStore = () => {
  const middleWares = [thunk];
  const composedEnhancer = composeWithDevTools(applyMiddleware(...middleWares));
  const store = createStore(rootReducer, composedEnhancer);

  return store;
};

export default configureStore;
