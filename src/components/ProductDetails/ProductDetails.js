import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../effects/fakeStoreApi';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/cartSlice';
import './ProductDetails.css';
import {IconContext} from "react-icons";
import {BsCartPlus} from "react-icons/bs";

function ProductDetails() {
    const { id } = useParams();
    const { data: product, isLoading } = useProduct(id);
    const dispatch = useDispatch();

    if (isLoading) return <p>Loading...</p>;

    const addToCart = () => {
        dispatch(addItemToCart(product));
    }

    return (
        <div className="product-details">
        <div>
            <img src={product.image} alt={product.title} />

        </div>
            <div>
                <h2>{product.title}</h2>
            </div>
        <div>
            <p>{product.description}</p>

        </div>
        <div>
            <p>${product.price}</p>

        </div>
            <div className="product-actions">

                <IconContext.Provider
                    value={{ color: 'green', size: '35px' }}
                >
                    <div>
                        <BsCartPlus data-testid="add-to-cart-button" onClick={addToCart} />

                    </div>
                </IconContext.Provider>
            </div>
        </div>
    );
}

export default ProductDetails;
