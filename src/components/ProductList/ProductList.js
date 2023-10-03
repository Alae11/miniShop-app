import React from 'react';
import { useProducts } from '../../effects/fakeStoreApi';
import { Link } from 'react-router-dom';
import './ProductList.css';
import {AiOutlineEye} from "react-icons/ai";
import {IconContext} from "react-icons";

function ProductList() {
    const { data: products, isLoading } = useProducts();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product">
                    <Link to={`/product/${product.id}`} className="product-link">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                    </Link>
                    <p className="product-description">{product.description?.substring(0, 100)}...</p>
                    <p>${product.price}</p>

                    <Link to={`/product/${product.id}`} className="details-button">
                        <IconContext.Provider
                            value={{ color: 'black', size: '24px' }}
                        >
                            <div>
                                <AiOutlineEye />
                            </div>
                        </IconContext.Provider>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
