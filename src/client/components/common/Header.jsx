import LogoImg from '../../assets/common/logo.png';
import { menulists } from '../../assets/data/data';
import { CustomNavLink, FlexibleLink } from '../common/CustomComponents'
import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const menuRef = useRef(null);

    const closeMenuOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeMenuOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", closeMenuOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    });

    const isHomePage = location.pathname === "/";

    return (
        <>
            <header className={
                isHomePage
                    ? `header px-12 py-3 bg-white-100 relative z-20 ${isScrolled ? "scrolled" : ""
                    } `
                    : `header px-12 py-3 relative z-20 ${isScrolled ? "scrolled" : ""}`
            }>
                {isHomePage && (
                    <div
                        className={`${isScrolled ? "lg:bg-none" : 'lg:bg-black'
                            } lg:h-[88px] lg:absolute lg:top-0 lg:right-0 lg:w-1/3 lg:-z-10`}></div>

                )}
                <nav className="p-4 flex justify-between items-center relative">
                    <div className='flex items-center gap-14'>
                        <div>
                            <img src={LogoImg} alt='LogoImg' className="h-24" />
                        </div>
                        <div className='hidden lg:flex items-center justify-between gap-8'>
                            {menulists.map((list) => (
                                <li key={list.id} className="uppercase list-none">
                                    <CustomNavLink href={list.path}>{list.link}</CustomNavLink>
                                </li>
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center gap-8 icons'>
                        <div className='uppercase hidden lg:block text-inherit relative z-20'>
                            <FlexibleLink to="/login"
                                className={`${isScrolled || !isHomePage ? "text-primary" : "text-white"
                                    }`}>Login(Admin Page)</FlexibleLink>

                        </div>

                    </div>

                    <div ref={menuRef} className={`lg:flex lg:items-center lg:w-auto w-full p-5 absolute right-0 top-full menu-container ${isOpen ? "open" : "closed"}`}>
                        {menulists.map((list) => (
                            <li key={list.id} className="uppercase list-none">
                                <CustomNavLink href={list.path} className='text-white'>{list.link}</CustomNavLink>
                            </li>
                        ))}
                    </div>
                </nav>
            </header >
        </>
    )
}