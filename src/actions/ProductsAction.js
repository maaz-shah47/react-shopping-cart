import { FETCH_PRODUCTS } from '../types/ProductsTypes';

export const fetchProducts = async (dispatch) => {
  console.log('Fetching...');
  const res = await fetch('http://localhost:5000/api/products');
  const data = await res.json();

  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};
