import { createStore } from "redux";

const ADD_TO_CART = "cart/addToCart";
const REMOVE_ONE = "cart/removeOne";
const CLEAR_CART = "cart/clearCart";

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
}

export function removeOne(productId) {
  return {
    type: REMOVE_ONE,
    payload: productId,
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}

const initialState = {
  items: [],
};
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case REMOVE_ONE: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );

      if (!existingItem) {
        return state;
      }

      if (existingItem.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    }

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}

export const store = createStore(cartReducer);
