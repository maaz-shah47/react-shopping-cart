import { useState } from 'react';
import './App.css';
import Products from './components/Products';

import data from './data.json';

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');
  return (
    <div className='grid-container'>
      <header>
        <a href='/'>Home Page</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
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
