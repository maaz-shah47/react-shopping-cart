import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fade, Zoom } from 'react-reveal';
import { formatCurrency } from '../../utils/utils';
import Modal from 'react-modal';

import './Products.css';
import { fetchProducts } from '../../actions/ProductsAction';

const Products = ({ addToCart }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items.products);

  useEffect(() => {
    const getProducts = async () => {
      await fetchProducts(dispatch);
    };
    getProducts();
  }, [dispatch]);
  const [modalProduct, setModalProduct] = useState(null);

  const showModalHandler = (p) => {
    setModalProduct(p);
  };
  const closeModalHandler = () => {
    setModalProduct(null);
  };
  if (!products) {
    return <h1>Loading....</h1>;
  }
  return (
    <div>
      <Fade bottom cascade>
        <ul className='products'>
          {products.map((product) => (
            <li key={product._id}>
              <div className='product'>
                <a
                  href={`#${product._id}`}
                  onClick={() => showModalHandler(product)}
                >
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className='product-price'>
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className='button primary'
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {modalProduct && (
        <Modal isOpen={true} onRequestClose={closeModalHandler}>
          <Zoom>
            <button className='close-modal' onClick={closeModalHandler}>
              x
            </button>
            <div className='product-details'>
              <img src={modalProduct.image} alt={modalProduct.title} />
              <div className='product-details__description'>
                <p>
                  <strong>{modalProduct.title}</strong>
                </p>
                <p>{modalProduct.description}</p>
                <p>
                  Available Sizes{' '}
                  {modalProduct.availableSizes.map((size) => (
                    <span>
                      {' '}
                      <button className='button'>{size}</button>
                    </span>
                  ))}
                </p>
                <div className='product-price'>
                  <div>{formatCurrency(modalProduct.price)}</div>
                  <button
                    className='button primary'
                    onClick={() => {
                      addToCart(modalProduct);
                      closeModalHandler();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default Products;
