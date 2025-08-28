import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/Logo.png";
import { FaSearch } from 'react-icons/fa';
import { Badge, Space } from 'antd';
import { useAuthContext } from '../../context/AuthContext';
import OrderModal from '../OrderModel';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { useCartContext } from '../../context/CartContext';

const Navbar = () => {
    const { cart } = useCartContext();
    const { isAuth, handleLogout, user, isAdmin } = useAuthContext();
    const [isModelOpen, setIsModelOpen] = useState(false);

    return (
        <>
            <header>
                {/* Top navbar */}
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgba(254, 169, 40, 0.3)' }}>
                    <div className="container">
                        <Link to="/" className="navbar-brand d-flex align-items-center fs-4">
                            <div className="container">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        marginRight: "20px",
                                        background: "#fff",
                                        padding: "5px",
                                        borderRadius: "50%",
                                        boxShadow: "0 0 5px rgba(0,0,0,0.2)"
                                    }}
                                />
                            </div>
                            <span style={{ fontWeight: "600" }}>ShopMe</span>
                        </Link>

                        {/* Search + Cart */}
                        <form className="d-flex align-items-center position-relative me-2 gap-2" role="search">
                            <input
                                className="form-control ps-5"
                                type="search"
                                placeholder="Search for products"
                                aria-label="Search"
                                style={{ borderRadius: "25px", width: "250px", border: "1px solid #ccc" }}
                            />
                            <FaSearch style={{
                                position: "absolute",
                                left: "15px",
                                color: "#888"
                            }} />
                            <Link to='/cart'>
                                <button className='btn order-btn align-item-center justify-content-center fs-2' style={{ outline: "none", boxShadow: "none" }} type='button'>
                                    <Badge count={cart?.length}>
                                        <RiShoppingCart2Line size={24} />
                                    </Badge>
                                </button>
                            </Link>
                        </form>
                    </div>
                </nav>

                {/* Bottom navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white border-top border-bottom">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                            {/* Center links */}
                            <div className="w-100 d-flex justify-content-center fw-bold fs-5">
                                <ul className="navbar-nav mb-2 mb-lg-0">
                                    <li className="nav-item me-3">
                                        <Link to="/" className="nav-link active">Home</Link>
                                    </li>
                                    <li className="nav-item me-3">
                                        <Link to="/products" className="nav-link active">Products</Link>
                                    </li>
                                    <li className="nav-item me-3">
                                        <Link to="/lime" className="nav-link active">LimeLight</Link>
                                    </li>
                                    <li className="nav-item me-3">
                                        <Link to="/mens" className="nav-link active">Mens Wear</Link>
                                    </li>
                                </ul>

                                {/* Auth & Dashboard */}
                                {!isAuth ? (
                                    <Space>
                                        <Link to="/auth/login" className="btn fw-bold fs-5">Login</Link>
                                    </Space>
                                ) : (
                                    <Space>
                                        {isAdmin && (
                                            <Link to="/dashboard" className="btn fw-bold fs-5">Dashboard</Link>
                                        )}
                                        <button className="btn fw-bold fs-5" onClick={handleLogout}>Logout</button>
                                    </Space>
                                )}
                            </div>

                            <div className="d-flex align-items-center me-3">
                                {/* Future right content here */}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <OrderModal isModalOpen={isModelOpen} setIsModelOpen={setIsModelOpen} />
        </>
    );
};

export default Navbar;
