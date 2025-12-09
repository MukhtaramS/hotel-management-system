/* eslint-disable no-unused-vars */
import { useParams, NavLink } from "react-router-dom";
import { productlists } from "../../assets/data/data"
import { BodyOne, Caption, Title } from "../../components/common/CustomComponents";
import { useState } from "react";
import { ProductSlideCard } from "../../components/product/ProductSlide";
import { FilterDiscover } from "../../components/hero/InstagramPost";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ProductDetails = () => {
    const { roomId } = useParams();
    const product = productlists.find(
        (product) => product.id === parseInt(roomId)
    );
    const { title, images, price, description, discount, color } = product;

    const [selectedPrice, setSelectedPrice] = useState(
        price.find((price) => price.color === color[0].value)
    );

    if (!product) {
        return <div>Product Not Found</div>
    }

    const CustomPage = ({ index, onClick }) => (
        <div>
            <img src={images[index].image} alt="" onClick={onClick} />
        </div>
    );
    const settings = {
        customPaging: (i) => <CustomPage index={i} />,
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            <section className="container mt-32 slideproduct">
                <div className="flex justify-between flex-col lg:flex-row" key={roomId}>
                    <div className="images lg:w-1/2">
                        <div>
                            <Slider {...settings}>
                                {images.map((image, index) => (
                                    <img
                                        src={image.image}
                                        key={index}
                                        className="w-full h-full"
                                        alt="" />
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="details lg:w-1/2 px-16 pt-16">
                        <button className="feature-btn bg-indigo-600">
                            SALE{discount}% OFF
                        </button>
                        <Title level={2} className='my-2'>{title}</Title>
                        <p className="text-[15px]">{description}</p>
                        <br />
                        <div className="mt-5">
                            <Caption>Prices</Caption>
                            <div className="flex items-center gap-3">
                                <BodyOne className='line-through mt-4'>${selectedPrice.value}</BodyOne>
                                <Title level={4} className='text-primary-green'>
                                    ${(
                                        selectedPrice.value - (selectedPrice.value * product.discount) / 100
                                    ).toFixed(2)}
                                </Title>
                            </div>
                            <NavLink to={`/reservation/new/${roomId}`}>
                                <button className="quick-view-btn primary-btn">Book the Room</button>
                            </NavLink>
                        </div>
                        <br />
                        <hr className="my-5" />
                    </div>
                </div>
                <div className="flex justify-between flex-col lg:flex-row my-10">
                    <div className="lg:w-1/2">
                        <Title level={3}>Fits Your Comfort:</Title>
                        <Caption>
                            Experience unparalleled comfort in our rooms, designed with a variety of sleeping arrangements to suit all needs. Each room features adjustable lighting and climate controls, plush bedding, and spacious seating areas to ensure your relaxation at any time.
                        </Caption>
                        <Title level={3} className='mt-5'>
                            Room Specifications:
                        </Title>
                        <div className="flex flex-col gap-3 mt-2">
                            <Caption>Dimensions: Varies by room type</Caption>
                            <Caption>Average Room Size: 350 sq ft</Caption>
                            <Caption>Bed Types Available: King, Queen, Twin</Caption>
                            <Caption>Maximum Occupancy: Varies by room type</Caption>
                            <Caption>Views Available: Cityscape, Mountain, Garden</Caption>
                        </div>
                    </div>
                    <div className="lg:w-1/2 grid grid-cols-2 gap-5">
                        <ProductDetailsBox title='Luxurious Amenities' desc='Every room is equipped with state-of-the-art technology and luxury amenities. From high-speed Wi-Fi to a fully stocked minibar and premium toiletries, we cater to your every need from the moment you arrive.' />
                        <ProductDetailsBox title='Versatile Room Use' desc='Our rooms are designed to accommodate a range of activities, from a restful nights sleep to a comfortable workspace. Each room includes a desk, multiple power outlets, and seating to suit both relaxation and productivity' />
                        <ProductDetailsBox title='Optimal Room Layout' desc='"Our thoughtfully designed rooms utilize space efficiently, ensuring that each area is perfectly suited for relaxation, work, or entertainment without feeling cluttered or confined."' />
                        <ProductDetailsBox title='Installation-Free Experience' desc='Enjoy a hassle-free stay with no setup required. Our rooms are prepared to your preference before arrival, ensuring a seamless and welcoming experience as soon as you enter.' />
                    </div>
                </div>
                <Title level={3} className='my-5'>Related Products</Title>
                <ProductSlideCard />
            </section>
            <br />
            <FilterDiscover />
        </>
    );
};

export const ProductDetailsBox = ({ title, desc }) => {
    return (
        <div className="flex items-center justify-center flex-col gap-3 text-center bg-gray-100 p-8 lg:p-0">
            <Title level={5}>{title}</Title>
            <Caption>{desc}</Caption>
        </div>
    );
};
