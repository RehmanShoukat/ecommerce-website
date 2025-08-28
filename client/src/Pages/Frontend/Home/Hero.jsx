import React, { useState } from "react";
import Slider from "react-slick";
import Image1 from "../../../assets/hero/women.png";
import Image2 from "../../../assets/hero/sale.png";
import Image3 from "../../../assets/hero/shopping.png";

import OrderModal from "../../../components/OrderModel";

const ImageList = [
    {
        id: 1,
        img: Image1,
        title: "Upto 50% off on all Men's Wear",
        description:
            "Upgrade your style with up to 50% off on all Men’s Wear. From casual to formal, find your perfect look at unbeatable prices. Limited time offer — shop now",
    },
    {
        id: 2,
        img: Image2,
        title: "30% off on all Women's Wear",
        description:
            "Step into style with 30% off on all Women’s Wear! Trendy, elegant, and affordable — find outfits you’ll love. Don’t miss out, limited time only. Shop your favorites today",
    },
    {
        id: 3,
        img: Image3,
        title: "70% off on all Products Sale",
        description:
            "Mega Sale Alert! 🛒 Enjoy up to 70% OFF on everything — fashion, electronics, beauty, and more. Unbeatable prices you don’t want to miss. Limited time only, so hurry! Shop now and grab your favorites before they’re gone. Big savings, big smiles — only on our store!",
    },
];

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
    };

    const [isModelOpen , setIsModelOpen] = useState(false)

    return (
        <>
            {/* <div className="hr"></div> */}
            <div className="hero-section position-relative">
                <div className="background-shape"></div>
                {/* Hero Content here */}


                <div className='bg-light text-dark py-5'>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-10 offset-1">
                                <Slider {...settings}>
                                    {ImageList.map((data) => (
                                        <div key={data.id}>
                                            <div
                                                className="row"
                                                style={{
                                                    minHeight: "500px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {/* Text Column */}
                                                <div className="col-md-6 text-center align-items-center">
                                                    <h1 className="fw-bold display-4">{data.title}</h1>
                                                    <p className="mt-3">{data.description}</p>
                                                    <button className="btn btn-primary btn-lg mt-3" onClick={()=>{setIsModelOpen(true)}}>Order Now</button>
                                                </div>

                                                {/* Image Column */}
                                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                                    <img
                                                        src={data.img}
                                                        alt="Hero"
                                                        className="img-fluid"
                                                        style={{
                                                            maxHeight: "450px",
                                                            objectFit: "contain",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <OrderModal isModalOpen={isModelOpen} setIsModelOpen={setIsModelOpen}/>
        </>

    );
};

export default Hero;
