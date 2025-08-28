import React, { useEffect, useState } from 'react'
import Image1 from '../../../assets/limeLight/1.webp'
import Image2 from '../../../assets/limeLight/2.webp'
import Image3 from '../../../assets/limeLight/3.webp'
import Image4 from '../../../assets/limeLight/4.webp'
import Image5 from '../../../assets/limeLight/5.webp'
import Image6 from '../../../assets/limeLight/6.webp'
import Image7 from '../../../assets/limeLight/7.webp'
import Image8 from '../../../assets/limeLight/8.webp'
import Img from "../../../assets/limeLight/women.webp"
import Img1 from "../../../assets/limeLight/g1.webp"
import Img2 from "../../../assets/limeLight/g2.webp"
import Img3 from "../../../assets/limeLight/g3.webp"
import { TbShoppingBagPlus } from 'react-icons/tb'
import OrderModal from '../../../components/OrderModel'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../../../config/firebase'






// const shirtProducts = [
//     {
//         id: 1,
//         title: "Summer Short Pack",
//         description: "A timeless white shirt made with 100% cotton, perfect for formal and casual occasions.",
//         price: 1299,
//         image: Image1,

//     },
//     {
//         id: 2,
//         title: "Summer Pack",
//         description: "Stylish slim-fit denim shirt with front pockets, ideal for a rugged casual look.",
//         price: 1499,
//         image: Image2,
//     },
//     {
//         id: 3,
//         title: "Winter Short Pack",
//         description: "Soft flannel shirt with red and black checks for everyday comfort.",
//         price: 999,
//         image: Image3,
//     },
//     {
//         id: 4,
//         title: "Autam Short Pack",
//         description: "Elegant light-blue shirt tailored for office and formal events.",
//         price: 1199,
//         image: Image4,
//     },
//     {
//         id: 5,
//         title: "Spring Short Pack",
//         description: "Vibrant printed shirt perfect for beach holidays and summer outings.",
//         price: 1399,
//         image: Image5,
//     },
//     {
//         id: 6,
//         title: "Summer Pack",
//         description: "Modern shirt with mandarin collar and sleek black color for a trendy look.",
//         price: 1099,
//         image: Image6,
//     },
//     {
//         id: 7,
//         title: "Spring Pack",
//         description: "Blue and white striped shirt made with breathable fabric for long workdays.",
//         price: 1250,
//         image: Image7,
//     },
//     {
//         id: 8,
//         title: "Summer Pack",
//         description: "Lightweight linen shirt with half sleeves, great for hot weather.",
//         price: 899,
//         image: Image8,
//     },

// ];



const LimeLight = () => {
    const [isModalOpen, setIsModelOpen] = useState(false)
    const [isItems, setIsItems] = useState(null)
    const [products, setProducts] = useState([])      // ✅ Added this missing state
    const [loading, setLoading] = useState(true)      // ✅ Optional: for loader


    const fetchLimeLight = async () => {
        try {
            const q = query(collection(firestore, 'products'), where('category', '==', 'LimeLight'));
            const snapshot = await getDocs(q);
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(items);
        } catch (error) {
            console.error("Error during fetching Products", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLimeLight()
    }, [])
    return (
        <>
            <div className="container text-center position-relative mb-5">
                <img src={Img} alt="Banner Image" className='img-fluid mt-3 banner-img' />
                <h2 className='text-primary fw-bold mt-5'>LimeLight</h2>
                <p>Summer Collection On 50% Off</p>
                <div className="flex-wrap d-flex  align-items-center justify-content-center mt-4 gap-4" >
                    <Link to="/daily" style={{ textDecoration: "none" }} className="text-dark">
                        <div className="col-4 col-md-2 text-center">
                            <div className='d-flex justify-content-center'>
                                <img src={Img2} alt="Printed" className=" rounded-circle mb-2" style={{ width: "220px", height: "220px", objectFit: "cover" }} />

                            </div>
                            <h6 className="fw-bold">Daily Wear</h6>
                        </div>
                    </Link>
                    <Link to="/child" style={{ textDecoration: "none" }} className='text-dark'>
                        <div className="col-4 col-md-2 text-center">
                            <div className='d-flex justify-content-center'>
                                <img src={Image6} alt="Embroidered" className=" rounded-circle mb-2" style={{ width: "220px", height: "220px", objectFit: "cover" }} />

                            </div>
                            <h6 className="fw-bold">Child</h6>
                        </div>
                    </Link>
                </div>
                {loading
                    ? <div style={{ minHeight: '200px' }} className="d-flex justify-content-center align-items-center" >
                        <Spin size='large' />
                    </div>
                    : <div className="row">
                        {products.map((data) => {
                            return (

                                <div className="col-12 col-md-6 col-lg-4 " data-aos="fade-up" key={data.id}>
                                    <div className="card mb-2 mt-4">
                                        <div className='d-flex align-items-center justify-content-center '>
                                            <TbShoppingBagPlus onClick={() => { setIsModelOpen(true), setIsItems(data) }}
                                                style={{
                                                    position: "absolute",
                                                    bottom: "10rem",
                                                    right: "1rem",
                                                    zIndex: 1,
                                                    background: "#fff",
                                                    WebkitBorderRadius: "100%",
                                                    borderRadius: "100%",
                                                    boxShadow: "0 0 10px 0 #00000059",
                                                    padding: "8px",
                                                    cursor: "pointer",
                                                    fontSize: "3rem",
                                                    color: "#000"
                                                }}
                                            />
                                            <img className='img-fluid product-img' src={data.image} alt={data.title} />

                                        </div>
                                        <div className="card-body  align-items-center justify-content-center">
                                            <h3 className='card-title mb-0 fw-bold '>{data.title}</h3>
                                            <p className='text-muted small'>{data.description}</p>
                                            <em className='fw-bold fs-4'>Rs .{data.price}</em>
                                        </div>
                                    </div>
                                </div>
                            )

                        })}
                    </div>}


            </div>
            <OrderModal isModalOpen={isModalOpen} setIsModelOpen={setIsModelOpen} product={isItems} />
        </>
    )
}

export default LimeLight

