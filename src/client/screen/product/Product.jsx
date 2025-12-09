import { Title, BodyOne } from "../../components/common/CustomComponents"
import { productlists } from "../../assets/data/data"
import { ProductCard } from "../../router"

export const Product = () => {
    return (
        <>
            <section className="py-20 bg-white-100 ">
                <div className="container">
                    <Title level={4}>Most Popular Rooms</Title>
                    <div className="flex items-center gap-3 uppercase">
                        <BodyOne className='text-sm'>All room(30)</BodyOne>
                        <BodyOne className='text-sm text-primary-green'>
                            Types of rooms (4)
                        </BodyOne>
                    </div>
                    <div className="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                        {productlists.map((product) => (
                            <ProductCard
                                id={product.id}
                                key={product.id}
                                title={product.title}
                                description={product.description}
                                images={product.images}
                                price={product.price}
                                discount={product.discount}
                                featured={product.featured}
                                category={product.category}
                                color={product.color}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}