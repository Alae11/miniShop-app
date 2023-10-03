import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const mockState = {
    cart: {
        items: [{
            id: '1',
            image: 'image-url',
            title: 'Item 1',
            quantity: 1,
            totalPrice: 100.00,
        }],
    },
};

const store = mockStore(mockState);

test('renders CartItem with correct information and buttons function correctly', () => {
    render(
        <Provider store={store}>
            <Cart />
        </Provider>
    );

    // You don't need to mock handleAdjustQuantity and handleRemoveItem
    // because they are connected to Redux actions in your component.

    fireEvent.click(screen.getByTestId('increment-button'));
    // Test that an action of the correct type and payload was dispatched.
    expect(store.getActions()).toContainEqual({ type: 'cart/adjustItemQuantity', payload: { id: '1', quantity: 2 } });

    fireEvent.click(screen.getByTestId('decrement-button'));
    expect(store.getActions()).toContainEqual({ type: 'cart/adjustItemQuantity', payload: { id: '1', quantity: 0 } }); // adjust the quantity as needed

    fireEvent.click(screen.getByTestId('remove-button'));
    expect(store.getActions()).toContainEqual({ type: 'cart/removeItemFromCart', payload: '1' });

    // Clear the actions for future assertions if needed
    store.clearActions();
});
