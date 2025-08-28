import React from 'react'
import Img1 from "../../../assets/women/women.png";
import Img2 from "../../../assets/women/women2.jpg";
import Img3 from "../../../assets/women/women3.jpg";
import Img4 from "../../../assets/women/women4.jpg";
import Img5 from "../../../assets/women/women5.jpg";
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const productData = [
    {
        id: 1,
        img: Img1,
        title: "Abdul Rehman",
        color: "white",
        rating: 5.0,
        aosDelay: "0"
    },
    {
        id: 2,
        img: Img2,
        title: "Umair Ahmed",
        color: "Red",
        rating: 4.9,
        aosDelay: "200"
    },
    {
        id: 3,
        img: Img3,
        title: " Bilal",
        color: "brown",
        rating: 4.8,
        aosDelay: "400"
    },
    {
        id: 4,
        img: Img4,
        title: " Hasnat",
        color: "Yellow",
        rating: 4.8,
        aosDelay: "600"
    },
    {
        id: 5,
        img: Img5,
        title: " Cheema",
        color: "black",
        rating: 1.0,
        aosDelay: "800"
    }
]

const Products = () => {
    return (
        <div className='mt-5 mb-5' id='products'>
            <div className="container">
                {/* {Header section} */}
                <div className='text-center mb-4'>
                    <p className='text-primary fw-bold' >Top Product For You</p>
                    <h2 className='fw-bold' >Products</h2>
                    <p className='text-muted small'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex ab id consequatur sint minima, facere nesciunt tempora, tenetur, dolor labore assumenda asperiores non a placeat dolore blanditiis ut consectetur? Eveniet.</p>
                </div>
                <div className='row g-4 justify-content-center'>
                    {productData.map((data) => {
                        return (
                            <div className='col-6 col-sm-4 col-md-3 col-lg-2 ' data-aos="fade-up" key={data.id}>
                                <div className="card h-100 shadow-sm">
                                    <img src={data.img} alt={data.title} style={{ height: "220px", objectFit: "cover" }} />
                                    <div className="card-body text-center" data-aos="fade-up">
                                        <h5 className='card-title mb-0' >{data.title}</h5>
                                        <p className='text-muted small mb-1'>{data.color}</p>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <FaStar className='text-warning me-1' /><span>{data.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className='text-center mt-4'>
                    <Link to="lime">
                    <button className='btn btn-primary' data-aos = "zoom-in">All Product</button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Products


// import React from "react";
// import Img1 from "../../../assets/women/women.png";
// import Img2 from "../../../assets/women/women2.jpg";
// import Img3 from "../../../assets/women/women3.jpg";
// import Img4 from "../../../assets/women/women4.jpg";
// import { FaStar } from "react-icons/fa6";

// const ProductsData = [
//   {
//     id: 1,
//     img: Img1,
//     title: "Women Ethnic",
//     rating: 5.0,
//     color: "white",
//     aosDelay: "0",
//   },
//   {
//     id: 2,
//     img: Img2,
//     title: "Women western",
//     rating: 4.5,
//     color: "Red",
//     aosDelay: "200",
//   },
//   {
//     id: 3,
//     img: Img3,
//     title: "Goggles",
//     rating: 4.7,
//     color: "brown",
//     aosDelay: "400",
//   },
//   {
//     id: 4,
//     img: Img4,
//     title: "Printed T-Shirt",
//     rating: 4.4,
//     color: "Yellow",
//     aosDelay: "600",
//   },
//   {
//     id: 5,
//     img: Img2,
//     title: "Fashin T-Shirt",
//     rating: 4.5,
//     color: "Pink",
//     aosDelay: "800",
//   },
// ];

// const Product = () => {

//   return (
//     <div className="mt-5 mb-5">
//       <div className="container">
//         {/* Header section */}
//         <div className="text-center mb-4">
//           <p className="text-primary fw-semibold">Top Selling Products for You</p>
//           <h2 className="fw-bold">Products</h2>
//           <p className="text-muted small">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi Sit asperiores modi
//           </p>
//         </div>

//         {/* Product Cards */}
//         <div className="row g-4 justify-content-center">
//           {ProductsData.map((data) => (
//             <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={data.id}>
//               <div className="card h-100 shadow-sm">
//                 <img
//                   src={data.img}
//                   alt={data.title}
//                   className="card-img-top"
//                   style={{ height: "220px", objectFit: "cover" }}
//                 />
//                 <div className="card-body text-center">
//                   <h5 className="card-title mb-1">{data.title}</h5>
//                   <p className="text-muted small mb-1">{data.color}</p>
//                   <div className="d-flex justify-content-center align-items-center">
//                     <FaStar className="text-warning me-1" />
//                     <span>{data.rating}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View All Button */}
//         <div className="text-center mt-4">
//           <button className="btn btn-primary px-4 py-2">View All Products</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;
