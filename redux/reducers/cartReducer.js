import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";
import { DELETE_PRODUCT } from "../actions/productsActions";
import { ADD_ORDER } from "../actions/orderActions";
import CartItem from "../../models/card-item";

const initialState = {
    items: {},
    totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            let updatedOrNewCardItem;
            if (state.items[addedProduct.id]) {
                updatedOrNewCardItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else {
                updatedOrNewCardItem = new CartItem(
                    1,
                    prodPrice,
                    prodTitle,
                    prodPrice
                );
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: updatedOrNewCardItem,
                },
                totalAmount: state.totalAmount + prodPrice,
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const currentQuantity = selectedCartItem.quantity;
            let updatedCardItems;
            if (currentQuantity > 1) {
                updatedCardItems = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCardItems = {
                    ...state.items,
                    [action.pid]: updatedCardItems,
                };
            } else {
                updatedCardItems = { ...state.items };
                delete updatedCardItems[action.pid];
            }
            return {
                ...state,
                items: updatedCardItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice,
            };
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state;
            }
            const updatedItems = {
                ...state.items,
            };
            delete updatedItems[action.pid];
            const totalItem = state.items[action.pid].sum;
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - totalItem,
            };
        default:
            return state;
    }
};

export default cartReducer;
