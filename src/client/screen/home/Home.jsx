import { Product, Hero, ShippingInfo, ProductSlide, Testimonials, InstagramPost, RoomCollection, Component, Draft, Entertainments } from '../../router'
export const Home = () => {
    return (
        <>
            <Hero isHomePage={true} />
            <RoomCollection />
            <Draft />
            <ShippingInfo />
            <Product />
            <Component />
            <ProductSlide />
            <Testimonials />
            <Entertainments />
            <InstagramPost />
        </>
    )
}