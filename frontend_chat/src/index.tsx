import * as React from "react";
import * as ReactDOM from "react-dom";
import "./sass/main.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import chatReducer from "./store/chat/reducer";
import authReducer from "./store/auth/reducer";
import utilsReducer from "./store/utils/reducer";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const composeEnhancers:any = compose;

function configureStore() {
  const rootReducer = combineReducers({
      chat: chatReducer,
      auth: authReducer,
      utils: utilsReducer,
  });

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}

const store = configureStore();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById("app")
)
