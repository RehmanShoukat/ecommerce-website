import React, { useState } from 'react';
import { useCartContext } from '../../../context/CartContext';
import { FiTrash } from 'react-icons/fi';
import CheckoutModal from '../../../components/CheckoutModel';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart } = useCartContext();
  const [showModal, setShowModal] = useState(false);

  const handleRemove = (index) => {
    removeFromCart(index);
    window.toastify("Product deleted successfully" , "success")
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, idx) => (
            <div className="d-flex align-items-center border rounded p-2 mb-3" key={idx}>
              <img
                src={item.image}
                alt="product"
                className="img-thumbnail me-3"
                style={{ width: '100px', height: '130px', objectFit: 'cover' }}
              />
              <div className="flex-grow-1">
                <h6 className="mb-1">{item.name}</h6>
                <small className="text-muted">{item.description}</small>
                <div className="mt-1">
                  <span className="me-3">Size: <strong>{item.size}</strong></span>
                  <span className="me-3">Qty: <strong>{item.quantity}</strong></span>
                  <span className="fw-bold">Rs. {item.price * item.quantity}</span>
                </div>
              </div>
              <button className="btn btn-link text-danger ms-2" onClick={() => handleRemove(idx)}>
                <FiTrash size={18} />
              </button>
            </div>
          ))}

          <div className="text-center mt-4">
            <h5>Total: Rs. {totalPrice}</h5>
            <div>
            <button className="btn btn-dark text-white mt-2  me-2 px-5" onClick={() => setShowModal(true)}>
              Check Out
            </button>
            <br />
            <Link to="/lime">
            <button className='btn btn-dark me-2 mt-3 px-3'> Continue Shopping</button>
            </Link>
            </div>
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default CartPage;
