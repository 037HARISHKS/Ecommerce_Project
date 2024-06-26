import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // use useLocation instead of useSearchParams
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword') || '';

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products?keyword=${keyword}`)
            .then(res => res.json())
            .then(res => setProducts(res.products))
            .catch(error => console.error('Error fetching products:', error));
    }, [keyword]);

    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </Fragment>
    );
}
