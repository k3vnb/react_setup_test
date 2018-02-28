import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ticketListReducer from './reducers/ticket-list-reducer';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './components/App';
import rootReducer from './reducers/index';
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import persistDataLocally from './middleware/persist-data-locally';

const store = createStore(rootReducer, applyMiddleware(persistDataLocally));

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

const render = (Component) => {
  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <Component/>
      </Provider>
    </HashRouter>,
    document.getElementById('react-app-root')
  );
};

render(App);
/*eslint-disable */
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
/*eslint-enable */
