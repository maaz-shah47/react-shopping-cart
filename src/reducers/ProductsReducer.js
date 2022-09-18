import { FETCH_PRODUCTS } from '../types/ProductsTypes';

export const productsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PRODUCTS:
      return { ...state, items: payload };
    default:
      return state;
  }
};
