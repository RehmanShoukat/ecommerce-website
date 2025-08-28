import React, { useState } from "react";
import Img1 from "../../../assets/shirt/shirt.png";
import Img2 from "../../../assets/shirt/shirt2.png";
import Img3 from "../../../assets/shirt/shirt3.png";
import { FaStar } from "react-icons/fa";
import OrderModal from "../../../components/OrderModel";


const ProductsData = [
  {
    id: 1,
    image: Img1,
    title: "Casual Wear",
    price: 2499,
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    image: Img2,
    title: "Printed shirt",
    price: 1999,
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    image: Img3,
    title: "Women shirt",
    price: 2999,
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const MensShirts = () => {
  const [isModalOpen, setIsModelOpen] = useState(false)
  const [isItems, setIsItems] = useState(null)
  return (
    <>
      <div className="container my-5">
        {/* Header section */}
        <div className="text-start mb-5">
          <p data-aos="fade-up" className="text-primary fw-bold mb-1">
            Top Rated Products for you
          </p>
          <h2 data-aos="fade-up" className="fw-bold">
            Best Products
          </h2>
          <p data-aos="fade-up" className="text-muted small">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi Sit asperiores modi
          </p>
        </div>

        {/* Body section */}
        <div className="row justify-content-center g-4">
          {ProductsData.map((data) => (
            <div
              className="col-12 col-sm-6 col-md-4 shirt"
              key={data.id}
              data-aos="zoom-in"
            >
              <div className="card h-100 text-center shadow-sm border-0 position-relative overflow-hidden">
                {/* Image section */}
                <div className="d-flex justify-content-center mt-5">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="img-fluid"
                    style={{
                      maxWidth: "140px",
                      transform: "translateY(-40px)",
                      transition: "transform 0.3s",
                    }}
                  />
                </div>

                {/* Details */}
                <div className="card-body">
                  <div className="mb-2 d-flex justify-content-center gap-1">
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                  </div>
                  <h5 className="card-title fw-bold">{data.title}</h5>
                  <p className="card-text text-muted small text-truncate" style={{ maxHeight: "3em" }}>
                    {data.description}
                  </p>
                  <button className="btn btn-primary rounded-pill mt-3" onClick={() => { setIsModelOpen(true), setIsItems(data) }}>Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderModal isModalOpen={isModalOpen} setIsModelOpen={setIsModelOpen} product={isItems} />
    </>
  );

};


export default MensShirts;