import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
            console.log('State before:', JSON.parse(JSON.stringify(state)));
            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].quantity++;
                state.items[existingItemIndex].totalPrice += newItem.price;
            } else {
                state.items.push({ ...newItem, quantity: 1, totalPrice: newItem.price });
            }

            state.totalQuantity++;
            state.totalPrice += newItem.price;
            console.log('State after:', JSON.parse(JSON.stringify(state)));

        },
        removeItemFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                state.totalQuantity--;

                if (existingItem.quantity === 1) {
                    state.items = state.items.filter((item) => item.id !== id);
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice -= existingItem.price;
                }

                state.totalPrice -= existingItem.price;
            }
        },
        adjustItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem && quantity > 0) {
                const quantityDifference = quantity - existingItem.quantity;
                existingItem.quantity = quantity;
                existingItem.totalPrice = existingItem.price * quantity;
                state.totalQuantity += quantityDifference;
                state.totalPrice += existingItem.price * quantityDifference;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const {
    addItemToCart,
    removeItemFromCart,
    adjustItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

