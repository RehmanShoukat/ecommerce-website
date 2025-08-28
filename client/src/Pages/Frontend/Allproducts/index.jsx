import React, { useEffect, useState } from 'react'
import bgVideo from "../../../assets/allproducts/background.mp4"
import OrderModal from '../../../components/OrderModel'
import { TbShoppingBagPlus } from 'react-icons/tb'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Spin } from 'antd'
import { firestore } from '../../../config/firebase'




const Allproducts = () => {
    const [isItems, setIsItems] = useState(null)
    const [isModalOpen, setIsModelOpen] = useState(false)
    const [products, setProducts] = useState([])      // ✅ Added this missing state
    const [loading, setLoading] = useState(true)      // ✅ Optional: for loader


    const fetchAllProducts = async () => {
        try {
            const q = query(collection(firestore, 'products'), where('category', '==', 'women'));
            const snapshot = await getDocs(q);
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(items);
        } catch (error) {
            console.error("Error fetching products", error)
        } finally {

            setLoading(false);
        }

    };

    useEffect(() => {
        fetchAllProducts()
    }, [])
    return (
        <>
            <div className="container text-center mb-5">
                <div className='mb-4 w-100 ' style={{ height: "400px", overflow: "hidden" }}>
                    <video src={bgVideo} autoPlay muted loop className="w-100 h-100" style={{ objectFit: "cover" }}></video>
                </div>
                <div>
                    <h1 className='fw-bold mb-4'>GLAM PRET</h1>
                </div>
                {loading ?
                    <div style={{ minHeight: '200px' }} className="d-flex justify-content-center align-items-center" >
                        <Spin size='large' />
                    </div>
                    :
                    <div className="row">
                        {products.map((data) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-4 " key={data.id} data-aos = "fade-up">
                                    <div className="card mb-2">
                                        <div
                                            className='position-relative d-flex align-items-center justify-content-center'
                                            style={{ height: "550px", overflow: "hidden" }}
                                        >
                                            <TbShoppingBagPlus
                                                onClick={() => {
                                                    setIsModelOpen(true);
                                                    setIsItems(data);
                                                }}
                                                style={{
                                                    position: "absolute",
                                                    bottom: "20px", // ✅ consistent bottom position
                                                    right: "20px", // ✅ consistent right position
                                                    zIndex: 1,
                                                    background: "#fff",
                                                    WebkitBorderRadius: "100%",
                                                    borderRadius: "100%",
                                                    boxShadow: "0 0 10px 0 #00000059",
                                                    padding: "8px",
                                                    cursor: "pointer",
                                                    fontSize: "3rem",
                                                    color: "#000",
                                                }}
                                            />
                                            <img
                                                className='img-fluid product-img'
                                                src={data.image}
                                                alt={data.title}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
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
            <OrderModal isModalOpen={isModalOpen} setIsModelOpen={setIsModelOpen} product={isItems} />
        </>
    )
}

export default Allproducts

