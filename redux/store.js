import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import ordersReducer from "./reducers/ordersReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer,
});

//  composeWithDevTools()

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
