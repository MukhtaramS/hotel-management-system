import { Title, BodyOne } from "../common/CustomComponents"
import { NavLink } from "react-router-dom"
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ id, title, description, images, price, discount, featured }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const OpenModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    return (
        <>
            <div className="product card">
                <div className="images h-96">
                    {images.map((cover, index) => (
                        <img key={index} src={cover?.image} alt="" className="w-full h-full object-cover" />
                    ))}
                    <div className="flex justify-between w-full p-5 absolute top-0 left-0">
                        {discount && <button className="discount-btn">{discount}%</button>}
                        {featured && <button className="featured-btn">Featured</button>}
                    </div>
                    <div className=" flex items-center gap-2 justify-center absolute bottom-0 left-0 right-0 m-5">
                        <button onClick={OpenModal} className="quick-view-btn product-btn primary-btn">Read More</button>
                        <NavLink to={`/room-details/${id}`}>
                            <button className="quick-view-btn product-btn primary-btn">Book the Room</button>
                        </NavLink>

                    </div>
                </div>
                <div className='details flex items-center flex-col bg-white pt-6'>
                    <NavLink to={`/room-details/${id}`}>
                        <BodyOne>{title}</BodyOne>
                    </NavLink>
                    <div className='flex items-center gap-3'>
                        {price.slice(0, 1).map((priceItem, index) => (
                            <>
                                <BodyOne className="line-through" key={index}>${priceItem.value}</BodyOne>
                                <BodyOne className="text-primary-green">${(priceItem.value - (priceItem.value * discount) / 100).toFixed(2)}</BodyOne>
                            </>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <>
                    <div className='overlay-bg' onClick={closeModal}>
                        <div className='modal-overlay' onClick={closeModal}>
                            <div className='modal-content flex justify-between' onClick={(e) => e.stopPropagation()}>
                                <div className='w-1/2 h-[500px] overflow-hidden'>
                                    {images.slice(0, 1).map((cover, index) => (
                                        <img key={index} src={cover?.image} alt="" className="modal-image w-full h-full object-cover" />
                                    ))}
                                </div>
                                <div className='modal-details w-1/2 h-[500px] overflow-y-scroll p-9'>
                                    <button className="featured-btn bg-indigo-500">Sale {discount}% OFF</button>
                                    <Title level={2}>{title}</Title>
                                    {price.slice(0, 1).map((priceItem, index) => (
                                        <div className='flex items-center gap-3' key={index}>
                                            <BodyOne className="line-through mt-4">${priceItem.value}</BodyOne>
                                            <Title level={3} className="text-primary-green">${(priceItem.value - (priceItem.value * discount) / 100).toFixed(2)}</Title>
                                        </div>
                                    ))}
                                    <BodyOne className='text-sm lading-6'>{description}</BodyOne>
                                    <div className='flex items-center gap-3'>
                                        <NavLink to={`/room-details/${id}`}>
                                            <button className='primary-btn' >Book the Room</button>
                                        </NavLink>
                                    </div>
                                    <hr className='my-5' />
                                    <button className='close-btn absolute top-0 right-0 w-12 h-12 flex justify-center items-center bg-primary-green text-white' onClick={closeModal}><IoClose size={20} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

