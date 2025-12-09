import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { BiChat } from "react-icons/bi"
import { BodyOne, Title } from "../common/CustomComponents";
import { GiCoffeeCup, } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa";


const additionalInfo = [
    {
        id: 1,
        title: "Gourmet Breakfast",
        description: "Start each day with a diverse selection of local and international dishes prepared to delight every palate.",
        icon: <GiCoffeeCup size={50} />,
    },
    {
        id: 2,
        title: "24/7 Concierge Service",
        description: "Our concierge service is available around the clock to assist with restaurant reservations, travel tips, and any other inquiries to enhance your stay.",
        icon: <MdOutlineMarkUnreadChatAlt size={50} />,
    },
    {
        id: 3,
        title: "Exclusive Event Facilities",
        description: "Host your meetings, conferences, or special events in our sophisticated facilities equipped with state-of-the-art technology.",
        icon: <FaRegHandshake size={50} />,
    },
];

export const ShippingInfo = () => {
    return (
        <>
            <section className="container">
                <div className="py-32 grid drif-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {additionalInfo.map((info) => (
                        <div key={info.id} className="flex items-center justify-center flex-col text-center gap-3">
                            <div className="text-primary-green">{info.icon}</div>
                            <h3 className="text-xl font-bold mt-4">{info.title}</h3>
                            <p className="mt-2">{info.description}</p>
                        </div>
                    ))}
                </div>
                <div className="box bg-primary p-8 flex flex-col lg:flex-row items-center justify-between">
                    <div className="left flex items-center gap-3">
                        <BiChat size={100} color="white" />
                        <div>
                            <Title className='text-white leading-none' level={3}>SUBSCRIBE TO OUR NEWSLETTER</Title>
                            <BodyOne className='text-gray-300'>Get Latest News, Offers and Discounts</BodyOne>
                        </div>
                    </div>
                    <div className="left w-full p-5 px-8 lg:w-1/2">
                        <input type="text" className="outline-none w-full p-3" />
                    </div>
                </div>
            </section>
        </>
    )
}