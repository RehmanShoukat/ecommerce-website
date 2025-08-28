import React, { useState } from 'react';
import { useCartContext } from '../context/CartContext';

const OrderModal = ({ isModalOpen, setIsModelOpen, product }) => {
    const { addToCart } = useCartContext();
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    if (!isModalOpen || !product) return null;

    const totalPrice = product.price * quantity;

    const handleAddToCart = () => {
        const cartItem = {
            ...product,
            size,
            quantity,
        };
        addToCart(cartItem);
        setIsModelOpen(false);
    };

    const sizes = ['extra-small', 'small', 'medium', 'large', 'extra-large'];

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content p-3" style={{ maxWidth: '1200px' }}>

                    <div className="modal-body row">
                        {/* Left Side: Image Thumbnails */}
                        <div className="col-md-6 text-center">
                            <img src={product.image} alt="product" className="img-fluid mb-3" style={{ maxHeight: '500px' }} />
                        </div>

                        {/* Right Side: Info */}
                        <div className="col-md-6">
                            <h5>{product.name}</h5>
                            <p className="fs-4 fw-bold">Rs. {product.price.toLocaleString()}</p>

                            {/* Size Options */}
                            <p className="fw-semibold mt-4">Size</p>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                {sizes.map((sz) => (
                                    <button
                                        key={sz}
                                        className={`btn border rounded-pill px-3 py-1 ${size === sz ? 'bg-dark text-white' : 'bg-white'}`}
                                        disabled={sz === 'extra-large'}
                                        onClick={() => setSize(sz)}
                                    >
                                        {sz}
                                    </button>
                                ))}
                            </div>

                            {/* Quantity Selector */}
                            <div className="d-flex align-items-center mb-3" style={{ maxWidth: '150px' }}>
                                <button className="btn border" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                                <div className="form-control text-center">{quantity}</div>
                                <button className="btn border" onClick={() => setQuantity(q => q + 1)}>＋</button>
                            </div>

                            {/* Total Price */}
                            <p className="fw-bold">Total: Rs. {totalPrice.toLocaleString()}</p>

                            {/* Add to Cart Button */}
                            <button
                                className="btn btn-dark rounded-pill px-4 py-2 mt-3 shadow"
                                onClick={handleAddToCart}
                                disabled={!size}
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        className="btn-close position-absolute top-0 end-0 m-3"
                        onClick={() => setIsModelOpen(false)}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;


