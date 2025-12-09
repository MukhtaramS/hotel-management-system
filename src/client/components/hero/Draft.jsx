import { Link, useNavigate } from 'react-router-dom';
import { promotionalInfo } from "../../assets/data/data"

const ScrollToTopLink = ({ to, className, children }) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate(to);
        window.scrollTo(0, 0);
    };

    return (
        <a href={to} onClick={handleClick} className={className}>
            {children}
        </a>
    );
};

export const Draft = () => {
    return (
        <section className="promo-section flex flex-row items-center justify-between pt-20">
            {promotionalInfo.map((info, index) => (
                <div className="promo-box relative w-full" key={info.id}>
                    <div className="image-container w-full h-[60vh]">
                        <img src={info.image} alt={info.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="info-overlay absolute bottom-0 left-0 p-3 md:p-7 w-full bg-black bg-opacity-50">
                        <h2 className="text-white text-2xl mb-4">{info.title}</h2>
                        <p className="text-white mb-4">{info.description}</p>
                        {index === 0 ? (
                            <a href="https://novastan.org/en/kyrgyzstan/life-by-the-river-the-naryn-in-kyrgyzstan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-light">
                                Learn More
                            </a>
                        ) : (
                            <ScrollToTopLink to="/rooms" className="btn btn-light">
                                Learn More
                            </ScrollToTopLink>
                        )}
                    </div>
                </div>
            ))}
            <div className="promo-box booking-info-card relative w-full">
                <div className="info-overlay absolute bottom-0 left-0 p-3 md:p-5 w-full bg-black bg-opacity-50">
                    <h2 className="text-white text-2xl mb-2">Premier Meeting Space: </h2>
                    <p className="text-white mb-9">Our conference room offers a sophisticated setting for your business meetings, training sessions, and corporate events.</p>
                    <ScrollToTopLink to="/rooms" className="btn btn-light">Book Your Stay</ScrollToTopLink>
                </div>
            </div>
        </section>
    );
};


