import { BodyOne, Title } from "../common/CustomComponents"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowRight } from "react-icons/md";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="absolute bottom-0 right-0 bg-white text-primary rounded-full slider-btn z-10"
            onClick={onClick}>
            <button className="next">
                <MdKeyboardArrowRight size={50} />
            </button>
        </div>
    );
}



export const Testimonials = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
    };
    return (
        <>
            <section className="testimonials">
                <div className="container h-full flex items-center justify-center">
                    <div className="w-1/2 flex relative z-50">
                        <div className="box w-96 h-96 bg-white rounded-full z-50">
                            <img src="../images/hero/girl.png"
                                className="absolute -top-[130px] left-0 z-10 rounded-b-full" />
                        </div>
                        <div className="bg-[rgba(255,255,255,0.5)] px-5 backdrop-blur-sm p-3 rounded-lg absolute top-36 right-60 z-50">
                            <BodyOne className='leading-none'>Our Satisfied User</BodyOne>

                            <div className="flex items-center">
                                <img src="../images/product/Jessika.jpeg"
                                    alt=''
                                    className="w-14 h-14 object-cover rounded-full border-2 border-gray-100" />
                                <img src="../images/product/Joe.jpg"
                                    alt=''
                                    className="-ml-4 w-14 h-14 object-cover rounded-full border-2 border-gray-100" />
                                <span className="-ml-4 w-14 h-14 object-cover rounded-full border-2 border-gray-300 bg-slate-50 flex itemscenter justify-center">
                                    +100
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="left w-1/2 relative z-50">
                        <Title level={2}>What our clients say about their stay</Title>
                        <Slider {...settings} >
                            <div>
                                <BodyOne className='mb-8'>
                                    Staying at Aska Hotel was an unforgettable experience. The breathtaking views and exceptional service made it more than just a place to stay—it felt like a retreat from the everyday. Every staff member went out of their way to ensure we had everything we needed, making our trip both relaxing and memorable.
                                </BodyOne>
                                <TestimonialsCard
                                    name='Jessica Tan                  '
                                    post='Travel Enthusiast                                '
                                    cover="../images/product/Jessika.jpeg" />
                            </div>
                            <div>
                                <BodyOne className='mb-8'>
                                    Finding a balance between work and leisure can be tough, but my time at Aska Hotel was a perfect retreat. The serene environment and high-speed internet facilitated a productive getaway. The wellness center and spa were just what I needed to recharge after long work sessions.
                                </BodyOne>
                                <TestimonialsCard
                                    name='Joe Do'
                                    post='Postgraduate Student'
                                    cover="../images/product/Joe.jpg" />
                            </div>
                            <div>
                                <BodyOne className='mb-8'>
                                    As a young professional, I rarely find the time to relax and unwind, but my stay at Aska Hotel changed that. The quiet reading nooks and the stunning garden views provided a great backdrop for both relaxation and catching up on work. The staff were incredibly accommodating, ensuring that I had a peaceful and productive stay. It was the perfect blend of comfort and convenience.
                                </BodyOne>
                                <TestimonialsCard
                                    name='Karen Smith'
                                    post='Young Professional'
                                    cover="../images/product/young-p-job.jpg" />
                            </div>
                            <div>
                                <BodyOne className='mb-8'>
                                    As an adventure seeker, I look for locations that can offer both comfort and convenience to various attractions. Aska Hotel was a great base for my excursions, and coming back to such a comfortable place after a day of exploring was fantastic. The local cuisine offered at the hotel was a delightful bonus.
                                </BodyOne>
                                <TestimonialsCard
                                    name='Reece Jonston'
                                    post='Adventure Seeker'
                                    cover="../images/product/adv-seeker.jpg" />
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    )
}

export const TestimonialsCard = ({ cover, name, post }) => {
    return (
        <div className="flex items-center gap-8">
            <div className="w-20 h-20">
                <img src={cover} className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="details">
                <Title className='font-meidum leading-none' level={5}>
                    {name}
                </Title>
                <p>{post}</p>
            </div>
        </div>
    )
}