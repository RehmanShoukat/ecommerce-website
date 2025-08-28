import React from 'react'
import Slider from 'react-slick';



const TestimonialData = [
    {
        id: 1,
        name: "Victor",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
        img: "https://picsum.photos/101/101",
    },
    {
        id: 2,
        name: "Satya Nadella",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
        img: "https://picsum.photos/102/102",
    },
    {
        id: 3,
        name: "Virat Kohli",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
        img: "https://picsum.photos/104/104",
    },
    {
        id: 5,
        name: "Sachin Tendulkar",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
        img: "https://picsum.photos/103/103",
    },
];

const Testimonial = () => {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="mb-5 py-5"data-aos ="zoom-in" >


            <div className="container">
                <div className='text-center mb-5' >
                    <p className='text-primary mb-0 '>What our customers are saying</p>
                    <h2 className='fw-bold'>Customer Reviews</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                </div>
                <div >
                    <Slider {...settings} >

                        {TestimonialData.map((data) => {
                            return (

                                <div className='px-3' key={data.id}>
                                    <div className='d-flex align-items-center '>
                                        <div className="card border-0 mx-3 p-4 position-relative h-100 " style={{ backgroundColor: "#8a6bff", borderRadius: "30px" }}>
                                            <div className='d-flex align-items-center mb-3'>
                                                <img src={data.img} alt={data.name} className='rounded-circle' />

                                            </div>
                                            <div className="card-body">
                                                <p className='card-text'>{data.text}</p>
                                                <h3 className='card-title'>{data.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>

                </div>
            </div>
        </div>
    )
}

export default Testimonial