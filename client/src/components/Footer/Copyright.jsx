import React from 'react'
import Banner from "../../assets/website/footer-pattern.jpg";
import footerLogo from "../../assets/Logo.png"
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from 'react-icons/fa';

const Copyright = () => {
  return (
    <div style={{
      backgroundImage: `url(${Banner})`,
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      backgroundRepeat: "no-repeat",
      width: "100%",
      minHeight: "500px"
    }}>

      <div className="container text-white mt-5 ">
        <div className="row">
          <div className="col-md-4 mt-3">
            <div className='d-flex align-items-center mb-4'>
              <img src={footerLogo} alt="Logo" width={50} className='me-2' />
              <h2 className='fw-bold mb-0'>ShopMe</h2>
            </div>
            <p>ShopMe is a modern ecommerce brand offering stylish and affordable men’s and women’s clothing for everyday fashion and comfort</p>
          </div>
          <div className="col-md-4 mt-4 ">
            <h4 className='fw-bold mb-3'>Important Links</h4>
            <ul className='list-unstyled'>
              <li>
                <a href="#" className='text-white text-decoration-none d-block mb-2'>Home</a>
              </li>
              <li>
                <a href="/about" className='text-white text-decoration-none d-block mb-2'>About</a>
              </li>
              <li>
                <a href="/contact" className='text-white text-decoration-none d-block mb-2'>Contact</a>
              </li>
              <li>
                <a href="/blog" className='text-white text-decoration-none d-block mb-2'>Blog</a>
              </li>
            </ul>

          </div>
          <div className="col-md-4 mt-4">
            <h4 className='fw-bold mb-3'> Contact Us</h4>
            <p className='d-flex align-items-center mb-2'><FaLocationArrow className='me-2' />AbdulRehman , Pakistan</p>
            <p className='d-flex align-items-center mb-2'><FaMobileAlt className='me-2' />+92 123456789</p>
     <div className='d-flex gap-3'>
      <a href="3" className='fs-4 text-white '><FaInstagram /></a>
      <a href="3" className='fs-4 text-white'><FaFacebook /></a>
      <a href="3" className='fs-4 text-white'><FaLinkedin /></a>
     </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Copyright