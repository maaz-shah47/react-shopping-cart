import React, { useState } from 'react';
import { Fade } from 'react-reveal';

import './CheckoutForm.css';

const CheckoutForm = ({ createOrder }) => {
  const [orderState, setOrderState] = useState({
    email: '',
    name: '',
    address: '',
  });
  const changeInputHandler = (e) => {
    setOrderState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    createOrder(orderState);
  };

  return (
    <Fade right cascade>
      <form onSubmit={onSubmitHandler}>
        <ul className='form-container'>
          <li>
            <label>Email</label>
            <input
              name='email'
              type='email'
              required
              onChange={changeInputHandler}
            />
          </li>
          <li>
            <label>Name</label>
            <input
              name='name'
              type='text'
              required
              onChange={changeInputHandler}
            />
          </li>
          <li>
            <label>Address</label>
            <input
              name='address'
              type='text'
              required
              onChange={changeInputHandler}
            />
          </li>
          <li>
            <button type='submit' className='button primary'>
              Checkout
            </button>
          </li>
        </ul>
      </form>
    </Fade>
  );
};

export default CheckoutForm;
