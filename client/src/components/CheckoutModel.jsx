import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { firestore } from '../config/firebase';
import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { loadStripe } from "@stripe/stripe-js";
import { Button } from 'antd';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Use env var

const CheckoutModal = ({ onClose }) => {
  const { cart, clearCart } = useCartContext();
  const { user } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false)


  const [form, setForm] = useState({
    contact: '',
    subscribe: true,
    region: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'bank',
    useSameBilling: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.uid) {
      console.error("User is not logged in");
      window.toastify("Please log in to place an order", "error");
      return;
    }
    setIsProcessing(true)
    const customerDetails = {
      email: form.contact,
      name: `${form.firstName} ${form.lastName}`,
      address: form.address,
      phone: form.phone,
    };

    try {
      // Save order in Firestore
      const orderId = `order-${Date.now()}`;
      await setDoc(doc(firestore, "orders", orderId), {
        userId: user.uid,
        cart,
        customerDetails,
        customerName: `${form.firstName} ${form.lastName}`,
        email: form.contact,
        totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        status: 'shipped', // or 'paid', based on logic
        createdAt: new Date(),
        paymentMethod: form.paymentMethod,
        shippingRegion: form.region,
        city: form.city,
        postalCode: form.postalCode,
        apartment: form.apartment,
      });


      // Create Stripe session
      console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cart,
          customerDetails,
          userId: user.uid,
        }),
      });

      const data = await res.json();
      if (!data.id) {
        throw new Error("No session ID returned from backend.");
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });

      clearCart();
      onClose();
    } catch (err) {
      console.error(err);
      window.toastify("Something went wrong during checkout", "error");
      setIsProcessing(false)
    }
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header px-4 pt-4">
            <h4 className="modal-title">Complete Your Order</h4>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body px-4" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
              {/* Contact */}
              <h5>Contact</h5>
              <input
                type="email"
                name="contact"
                className="form-control mb-2"
                placeholder="Email"
                value={form.contact}
                onChange={handleChange}
                required
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="subscribe"
                  checked={form.subscribe}
                  onChange={handleChange}
                />
                <label className="form-check-label">Email me with news and offers</label>
              </div>

              {/* Delivery */}
              <h5>Delivery</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Region</label>
                  <select
                    name="region"
                    className="form-select"
                    value={form.region}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select region</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="KPK">KPK</option>
                    <option value="Balochistan">Balochistan</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Country</label>
                  <input type="text" className="form-control" value="Pakistan" disabled />
                </div>
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Apartment (optional)</label>
                  <input
                    type="text"
                    name="apartment"
                    className="form-control"
                    value={form.apartment}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <select
                    name="city"
                    className="form-select"
                    value={form.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select city</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    className="form-control"
                    value={form.postalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <h5 className="mt-4">Payment</h5>
              <div className="form-check mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="form-check-input"
                  value="bank"
                  checked={form.paymentMethod === 'bank'}
                  onChange={handleChange}
                />
                <label className="form-check-label">Bank Transfer / JazzCash / Easypaisa</label>
              </div>
              <div className="form-check mb-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="form-check-input"
                  value="cod"
                  checked={form.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <label className="form-check-label">Cash on Delivery (COD)</label>
              </div>

              {/* Billing */}
              <h5>Billing Address</h5>
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  name="useSameBilling"
                  className="form-check-input"
                  checked={form.useSameBilling}
                  onChange={handleChange}
                />
                <label className="form-check-label">Same as shipping address</label>
              </div>
            </div>

            <div className="modal-footer px-4 pb-4">
              {/* <button type="submit"  className="btn btn-primary w-100">
                Pay now
              </button> */}
              <Button className="yellow-button" htmlType='submit' block loading={isProcessing} >Pay now</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
