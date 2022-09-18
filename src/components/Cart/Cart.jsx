import React, { Fragment, useState } from 'react';
import { Fade } from 'react-reveal';
import { formatCurrency } from '../../utils/utils';

import './Cart.css';
import CheckoutForm from './CheckoutForm';

const Cart = ({ cartItems, removeFromCart, createOrder }) => {
  const [checkoutFormIsVisible, setCheckoutFormIsVisible] = useState(false);

  const showCheckoutFormHandler = () => {
    setCheckoutFormIsVisible(true);
  };
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className='cart cart-header'>Cart is Empty</div>
      ) : (
        <div className='cart cart-header'>
          You have {cartItems.length} items in the cart
        </div>
      )}
      <div className='cart'>
        <Fade left cascade>
          <ul className='cart-items'>
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className='right'>
                    {formatCurrency(item.price)} x {item.count}{' '}
                    <button
                      className='button'
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
      </div>
      {cartItems.length !== 0 && (
        <div className='cart'>
          <div className='total'>
            <div>
              Total:{' '}
              {formatCurrency(
                cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )}
            </div>
            <button
              className='button primary'
              onClick={showCheckoutFormHandler}
            >
              Proceed
            </button>
          </div>
        </div>
      )}
      {checkoutFormIsVisible && (
        <div className='cart'>
          <CheckoutForm createOrder={createOrder} />
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
