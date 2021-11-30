import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from 'redux-persist/lib/storage'
import { encryptTransform } from "redux-persist-transform-encrypt";
import { userReducer } from "../reducers/userReducer";
import { chatReducer } from "../reducers/chatReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  user : {
    userData: {
        _id: "",
        name: "",
        surname: "",
        email: "",
        avatar: "",
    }, 
    // isLoggedIn: false,
  }, 
  chats: {}
}

const persistConfig = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_KEY,
      onError: (error) => {
        console.log(error);
      },
    }),
  ],
};

const combinedReducer = combineReducers({
  user: userReducer,
  chats: chatReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const configureStore = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(configureStore)

export { configureStore, persistor }