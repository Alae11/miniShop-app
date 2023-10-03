import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ProductDetails from './ProductDetails'; // Adjust with your actual path

const mockStore = configureMockStore();
const store = mockStore({ /* Initial state of your store */ });

const mockProduct = {
    id: '1',
    image: 'image-url',
    title: 'Test Product',
    description: 'This is a test product',
    price: 100.00,
};

test('renders ProductDetails component correctly', () => {
    render(
        <Provider store={store}>
            <ProductDetails data={mockProduct} />
        </Provider>
    );

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toBeInTheDocument(); // Assuming you use product title as alt text for the image
});

test('handles "Add to Cart" button click correctly', () => {
    render(
        <Provider store={store}>
            <ProductDetails data={mockProduct} />
        </Provider>
    );

    fireEvent.click(screen.getByTextId('Add to Cart'));

    expect(store.getActions()).toContainEqual({
        type: 'cart/addItemToCart',
        payload: mockProduct
    });
});
