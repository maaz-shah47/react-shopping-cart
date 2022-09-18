import { useState } from 'react';
import Products from './components/Products/Products';

import data from './data.json';

import './App.css';
import Filter from './components/Filter/Filter';
import Cart from './components/Cart/Cart';

const App = () => {
  const [products, setProducts] = useState(data.products);
  const initialCartItems = JSON.parse(localStorage.getItem('cartItems'));
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');
  const [cartItems, setCartItems] = useState(
    initialCartItems ? initialCartItems : []
  );

  const sortProductsHandler = (event) => {
    const sort = event.target.value;
    setSort(sort);
    setProducts((prevState) =>
      prevState
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : sort === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        )
    );
  };
  const sizeFilterHandler = (event) => {
    const newSize = event.target.value;
    if (newSize === '') {
      setSize(newSize);
      setProducts(data.products);
    } else {
      setSize(newSize);
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(newSize) >= 0
        )
      );
    }
  };

  const addToCartHandler = (product) => {
    const newCartItems = cartItems.slice();
    let alreadyInCart = false;
    newCartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count = item.count + 1;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      newCartItems.push({ ...product, count: 1 });
    }

    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const removeFromCartHandler = (product) => {
    const newCartItems = cartItems.slice();
    setCartItems(newCartItems.filter((item) => item._id !== product._id));
    localStorage.setItem(
      'cartItems',
      JSON.stringify(newCartItems.filter((item) => item._id !== product._id))
    );
  };

  const createOrder = (orderFormValues) => {
    const orderState = {
      order: orderFormValues,
      cartItems: cartItems,
    };
    console.log(orderState);
  };

  return (
    <div className='grid-container'>
      <header>
        <a href='/'>Home Page</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              sortHandler={sortProductsHandler}
              sizeHandler={sizeFilterHandler}
            />
            <Products addToCart={addToCartHandler} />
          </div>
          <div className='sidebar'>
            <Cart
              createOrder={createOrder}
              cartItems={cartItems}
              removeFromCart={removeFromCartHandler}
            />
          </div>
        </div>
      </main>
      <footer>All rights reserved</footer>
    </div>
  );
};

export default App;
