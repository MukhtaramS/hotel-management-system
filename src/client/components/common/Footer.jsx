import LogoImg from '../../assets/common/logo.png';
import { BodyOne, Caption, CustomLink, Title } from './CustomComponents';

export const Footer = () => {
    return (
        <>
            <footer className="py-14">
                <div className="container grid-col-1 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                    <img src={LogoImg} className='h-10' />

                        <div className='flex flex-col gap-2 mt-5'>
                            <Caption>Address: Chiechieibaieva, 30a</Caption>
                            <Caption>Email: reservations@askahotel.com</Caption>
                            <Caption>Call: +996 700 000 000</Caption>
                        </div>
                        <br />
                        <BodyOne>Subscribe To Our Newsletter</BodyOne>
                        <input
                            type='text'
                            className='p-3 w-full border bg-white-100 border-gray-300 rounded-md outline-none'
                            placeholder='Enter your email address'
                        />
                    </div>
                    <div>
                        <Title level={5}>Explore Aska</Title>
                        <div className='flex flex-col gap-4'>
                            <CustomLink to='/about-us'>About Us</CustomLink>
                            <CustomLink to='/services'>Services</CustomLink>
                            <CustomLink to='/rooms'>Rooms & Suites</CustomLink>
                            <CustomLink to='/dining'>Dining</CustomLink>
                            <CustomLink to='/spa'>Spa & Wellness</CustomLink>
                            <CustomLink to='/contact'>Contact Us</CustomLink>
                        </div>
                    </div>
                    <div>
                        <Title level={5}>Quick Links</Title>
                        <div className='flex flex-col gap-4'>
                            <CustomLink to='/offers'>Special Offers</CustomLink>
                            <CustomLink to='/reviews'>Guest Reviews</CustomLink>
                            <CustomLink to='/faq'>FAQ</CustomLink>
                            <CustomLink to='/gallery'>Photo Gallery</CustomLink>
                            <CustomLink to='/careers'>Careers</CustomLink>
                        </div>
                    </div>
                    <div>
                        <Title level={5}>Discover Naryn</Title>
                        <div className='flex flex-col gap-4'>
                            <CustomLink to='/local-attractions'>Local Attractions</CustomLink>
                            <CustomLink to='/culture'>Culture & Heritage</CustomLink>
                            <CustomLink to='/activities'>Activities</CustomLink>
                            <CustomLink to='/maps'>Maps & Directions</CustomLink>
                            <CustomLink to='/weather'>Weather Forecast</CustomLink>
                            <CustomLink to='/blog'>Travel Blog</CustomLink>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
