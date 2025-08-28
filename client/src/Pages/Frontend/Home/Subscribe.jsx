import React from 'react'
import bgImg from "../../../assets/website/orange-pattern.jpg"

const Subscribe = () => {
  return (
    <div className="ima mb-5" data-aos="zoom-in" style={{
      backgroundImage: `url(${bgImg})`, backgroundPosition: "center", backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      color: 'white',
    }}>
      <div className="containrer py-5 backdrop">
        <div className='mx-auto' style={{maxWidth : "600px"}} >
          <h1 className='text-center fs-3 fs-semibold mb-4'>Get Notified About New Products</h1>
          <input type="email" placeholder='Enter your email' className='form-control p-3' />
        </div>
      </div>
    </div>
  )
}

export default Subscribe