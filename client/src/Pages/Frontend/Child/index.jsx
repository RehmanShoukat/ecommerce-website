import React, { useEffect, useState } from 'react'
import BgVideo from "../../../assets/child/video.mp4"


import { TbShoppingBagPlus } from 'react-icons/tb'
import OrderModal from '../../../components/OrderModel'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../../../config/firebase'
import { Spin } from 'antd'





const Child = () => {
    const [isModalOpen, setIsModelOpen] = useState(false)
    const [isItems, setIsItems] = useState(null)
    const [products, setProducts] = useState([])      // ✅ Added this missing state
    const [loading, setLoading] = useState(true)      // ✅ Optional: for loader


    const fetchKidsProducts = async () => {
        const q = query(collection(firestore, 'products'), where('category', '==', 'kids'));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(items);
        setLoading(false);
    };

    useEffect(() => {
        fetchKidsProducts()
    }, [])


    return (
        <>
            <div className="container text-center my-3 mb-5">
                <div className='w-100 mb-4' style={{ height: "400px", overflow: "hidden" }}>

                    <video src={BgVideo} autoPlay muted loop className='w-100 h-100' style={{ objectFit: " cover" }}></video>

                </div>
                <h1 className=' fw-bold mb-5' style={{ fontFamily: "VisbyCFMedium" }}>SUITS</h1>
                {loading ?
                    <div style={{minHeight: '200px'}} className= "d-flex justify-content-center align-items-center" >
                        <Spin size='large'/>
                    </div>
                    : <div className="row">
                        {products.map((data) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-4 "  key={data.id}>
                                    <div className="card mb-2">
                                        <div className='d-flex align-item-center justify-content-center '>
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
                                        <div className="card-body  align-item-center justify-content-center">
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
            <OrderModal setIsModelOpen={setIsModelOpen} isModalOpen={isModalOpen} product={isItems} />
        </>
    )
}

export default Child