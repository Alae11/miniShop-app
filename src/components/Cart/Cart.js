import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {adjustItemQuantity, clearCart, removeItemFromCart} from '../../features/cartSlice';
import './Cart.css';
import { AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";


const CartItem = ({ item }) => {
    const dispatch = useDispatch();


    const handleAdjustQuantity = (id, quantity) => {
        dispatch(adjustItemQuantity({ id, quantity }));
    };
    const handleRemoveItem= (id) => {
        dispatch(removeItemFromCart(id)); // Assuming deleteItem is your action creator for deleting an item.
    };



    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-item-info">
                <div className="cart-item-title">{item.title}</div>
                <div>{item.quantity} pcs - ${item.totalPrice.toFixed(2)}</div>
            </div>
            <div className="cart-item-quantity">

                <button
                    aria-label="Decrease Quantity"
                    data-testid="decrement-button"
                    className="cart-item-quantity-decrement"
                    onClick={() => handleAdjustQuantity(item.id, item.quantity - 1)}>
                    <AiOutlineMinus/>
                </button>

                <input type="text" value={item.quantity} readOnly />

                <button
                    data-testid="increment-button"

                    className="cart-item-quantity-increment"
                    onClick={() => handleAdjustQuantity(item.id, item.quantity + 1)}>
                    <AiOutlinePlus/>
                </button>
                <div className="cart-item-delete">
                    <button data-testid="remove-button" onClick={() => handleRemoveItem(item.id)}>
                        <AiFillDelete />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Cart Component
const CartComponent = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="cart-container">
            {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
            <div className="cart-total">Total Items: {totalQuantity} - Total Price: ${(totalPrice || 0).toFixed(2)}</div>
            <div className="cart-actions">
                <button onClick={handleClearCart}>Clear Cart</button>
            </div>
        </div>
    );
};

export default CartComponent;
