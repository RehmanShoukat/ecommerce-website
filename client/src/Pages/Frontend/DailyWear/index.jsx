import React, { useEffect, useState } from 'react'
import bgImg from "../../../assets/daily/bg.webp"
import { TbShoppingBagPlus } from 'react-icons/tb'
import OrderModal from '../../../components/OrderModel'
import { Spin } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../../../config/firebase'




const DailyWear = () => {

    const [isModalOpen, setIsModelOpen] = useState(false)
    const [isItems, setIsItems] = useState(null)
    const [products, setProducts] = useState([])      // ✅ Added this missing state
    const [loading, setLoading] = useState(true)      // ✅ Optional: for loader


    const fetchDailyProducts = async () => {
        try {
            const q = query(collection(firestore, 'products'), where('category', '==', 'Daily wear'));
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
        fetchDailyProducts()
    }, [])


    return (
        <>
            <div className="container text-center position-relative mb-5">
                <img src={bgImg} alt="Banner Image" className='img-fluid mt-3 banner-img' />
                <h2 className='text-primary fw-bold mt-5'>LimeLight</h2>
                <p>Summer Collection On 50% Off</p>
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

export default DailyWear

