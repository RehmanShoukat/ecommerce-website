import React, { useEffect, useState } from 'react'
import background from '../../../assets/mens/bg.mp4'
import OrderModal from '../../../components/OrderModel'
import { TbShoppingBagPlus } from 'react-icons/tb'
import { Spin } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../../../config/firebase'





const MensWear = () => {
  const [isModalOpen, setIsModelOpen] = useState(false)
  const [isItems, setIsItems] = useState(null)
  const [products, setProducts] = useState([])      // ✅ Added this missing state
  const [loading, setLoading] = useState(true)      // ✅ Optional: for loader


  const fetchMens = async () => {
    try {
      const q = query(collection(firestore, 'products'), where('category', '==', 'men'));
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
    fetchMens()
  }, [])
  return (
    <>
      <div className="container text-center my-3 mb-5">
        <div className='w-100 mb-4' style={{ height: "400px", overflow: "hidden" }}>

          <video src={background} autoPlay muted loop className='w-100 h-100' style={{ objectFit: "cover" }}></video>


        </div>
        <h1 className=' fw-bold mb-5' style={{ fontFamily: "VisbyCFMedium" }}>SUITS</h1>
        {loading
          ? <div style={{ minHeight: '200px' }} className="d-flex justify-content-center align-items-center" >
            <Spin size='large' />
          </div>
          :<div className="row" >
          {products.map((data) => {
            return (

              <div className="col-12 col-md-6 col-lg-4 "  key={data.id} data-aos="fade-up">
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

export default MensWear

