import React from 'react';

import './Filter.css';

const Filter = ({ count, size, sort, sortHandler, sizeHandler }) => {
  return (
    <div className='filter'>
      <div className='filter-result'>{count} Products</div>
      <div className='filter-sort'>
        Order{' '}
        <select value={sort} onChange={sortHandler}>
          <option>Latest</option>
          <option value='lowest'>Lowest</option>
          <option value='highest'>Highest</option>
        </select>
      </div>
      <div className='filter-size'>
        Filter{' '}
        <select value={size} onChange={sizeHandler}>
          <option value=''>All</option>
          <option value='XS'>XS</option>
          <option value='S'>S</option>
          <option value='M'>M</option>
          <option value='L'>L</option>
          <option value='XL'>XL</option>
          <option value='XLL'>XLL</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
