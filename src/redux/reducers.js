import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer({
    cartItems: [],
    subTotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
}, {
    addToCart: (state, action) => {
        const item = action.payload;
        const isItemExist = state.cartItems.find((i) => i.id === item.id);

        if (isItemExist) {
            state.cartItems.forEach((i) => {
                if (i.id === item.id) {
                    i.quantity += 1;
                }
            });
        }
        else {
            state.cartItems.push(item);
        }


    },
    decrement: (state, action) => {
        const item = state.cartItems.find((i) => i.id === action.payload);
        if (item.quantity > 1) {
            item.quantity -= 1;
        }
    },

    delete: (state, action) => {
        const id = action.payload;
        state.cartItems = state.cartItems.filter(i => i.id !== id);
    },
    calculations: (state) => {
        let sum = 0;

        state.cartItems.forEach((i) => {
            sum += (i.price * i.quantity);
        })
        state.subTotal = sum;
        state.tax = Math.ceil(state.subTotal * 0.18);
        state.shipping = (sum > 100 || sum === 0) ? 0 : 200;
        state.total = state.subTotal + state.tax + state.shipping;

    }
});