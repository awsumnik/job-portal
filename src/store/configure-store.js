import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { loadInititalAppState, savedState, saveState } from './';
loadInititalAppState()

let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(
    rootReducer,
    savedState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
} else {
  store = createStore(rootReducer, savedState, applyMiddleware(thunk));
}

store.subscribe(() => {
  saveState(store.getState());
});

export default store;