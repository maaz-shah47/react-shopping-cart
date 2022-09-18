import { useState } from 'react';
import Products from './components/Products/Products';

import data from './data.json';

import './App.css';
import Filter from './components/Filter/Filter';

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');

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
            <Products products={products} />
          </div>
          <div className='sidebar'>Cart Items</div>
        </div>
      </main>
      <footer>All rights reserved</footer>
    </div>
  );
};

export default App;
