import { Caption, Title } from '../common/CustomComponents'
import { FaSearchLocation } from 'react-icons/fa';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { BiHotel } from 'react-icons/bi';


const filterDiscoverItems = [
    {
        id: 1,
        title: "Explore & Choose",
        icon: <FaSearchLocation size={70} />,
        description: "Discover our variety of rooms and select the perfect one for your stay. Each room is detailed with amenities, availability, and rates.",
    },
    {
        id: 2,
        title: "Book Your Stay        ",
        icon: <FaRegCalendarCheck size={70} />,
        description: "Secure your room through our easy-to-use booking system. Enjoy transparent pricing with no hidden fees.",
    },
    {
        id: 3,
        title: "Prepare for Arrival        ",
        icon: < MdOutlineTravelExplore size={70} />,
        description: "Receive instant booking confirmation with all the details for your stay, including check-in instructions and contact information for any inquiries.",
    },
    {
        id: 4,
        title: "Experience Aska Hotel",
        icon: <BiHotel size={70} />,
        description: "Enjoy top-notch hospitality, comfortable rooms, and exceptional services. Explore local attractions to enhance your stay.",
    },
];

export const InstagramPost = () => {
    return (
        <>
            <section className='post grid-cols-1 grid  md:grid-cols-3 lg:grid-cols-6'>

            </section>
            <FilterDiscover />
        </>
    )
}

export const FilterDiscover = () => {
    return (
        <>
            <section className='grid-cols-1 grid  md:grid-cols-2 lg:grid-cols-4 bg-white-100'>
                {filterDiscoverItems.map((post) => (
                    <>
                        <div className='flex items-center gap-9 p-8 py-12 relative'>
                            <div className='icon'>
                                <i>{post.icon}</i>
                            </div>
                            <div>
                                <Title>{post.title}</Title>
                                <Caption>{post.description}</Caption>
                                <Title level={1} className='absolute -bottom-5 right-0 opacity-10'>0{post.id}</Title>
                            </div>
                        </div>
                    </>
                ))}
            </section>
        </>

    )
}