import { NavLink } from 'react-router-dom';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { entertainments } from "../../assets/data/data"

const NextArrow = ({ onClick }) => {
    return (
        <div className="slick-arrow slick-next" onClick={onClick}>
            <MdKeyboardArrowRight size={30} />
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div className="slick-arrow slick-prev" onClick={onClick}>
            <MdKeyboardArrowLeft size={30} />
        </div>
    );
};

const EntertainmentCard = ({ entertainment }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 3000
    };
    return (
        <div className="entertainment-card">
            <Slider {...settings}>
                {entertainment.images && entertainment.images.map((image, index) => (
                    <div key={index} className="slider-image-container">
                        <img src={image} style={{ width: "100%", height: "auto" }} />
                    </div>
                ))}
            </Slider>
            <div className="entertainment-info">
                <h3>{entertainment.name}</h3>
                <p>{entertainment.description}</p>
                <NavLink to={`https://www.tripadvisor.com/Attractions-g3657702-Activities-Naryn_Province.html`} className="btn btn-primary">Learn More</NavLink>
            </div>
        </div>
    );
};

export const Entertainments = () => {
    return (
        <div className="entertainments-container">
            {entertainments.map(entertainment => (
                <EntertainmentCard key={entertainment.id} entertainment={entertainment} />
            ))}
        </div>
    );
};

