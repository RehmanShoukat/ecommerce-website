import React from 'react'
import BannerImg from "../../../assets/women/women2.jpg"
import { GrSecure } from 'react-icons/gr'
import { IoFastFood } from 'react-icons/io5'
import { GiFoodTruck } from 'react-icons/gi'
import { MdDiscount } from 'react-icons/md'

const Banner = () => {
    return (
        <div className="py-5">
            <div className="container min-vh-50 align-items-center">
                <div className="row align-items-center g-3">
                    <div className="col-12  col-lg-6 text-center" data-aos="zoom-in">
                        <img className='img-fluid' src={BannerImg} alt="Winter Sale" style={{ maxwidth: "400px", height: "350px", objectFit: "cover", boxShadow: "-10px 10px 12px rgba(0,0,0,1)" }} />
                    </div>
                    <div className="col-12  col-lg-6">
                        <div className='d-flex flex-column gap-3'>
                            <h1 className='fw-bold fs-2' data-aos="fade-up">Winter Sale upto 50% Off</h1>
                            <p className=' small' data-aos="fade-up">Winter Sale: Enjoy up to 50% off on selected items. Shop now before it ends!</p>
                        </div>
                        <div className='d-flex flex-column gap-3'>
                            <div className='d-flex align-items-center gap-3' data-aos="fade-up">
                              <GrSecure className='fs-2 p-2 bg-primary rounded-circle text-white shadow-sm'/>
                              <p className='mb-0 fw-bold'>Quality Products</p>
                            </div>
                            <div className='d-flex align-items-center gap-3' data-aos="fade-up">
                            <IoFastFood className='fs-2 p-2 bg-success text-white rounded-circle'/>
                            <p className='mb-0 fw-bold'>Fast Delivery</p>
                            </div>
                            <div className='d-flex align-items-center gap-3'  data-aos="fade-up">
                                <GiFoodTruck className='fs-2 p-2 bg-warning rounded-circle '/>
                                <p className='mb-0 fw-bold'>Easy Payment method</p>
                            </div>
                            <div className='d-flex align-items-center gap-3'  data-aos="fade-up">
                               <MdDiscount className='fs-2 p-2 bg-info rounded-circle' />
                                <p className='mb-0 fw-bold'>Easy Payment method</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner