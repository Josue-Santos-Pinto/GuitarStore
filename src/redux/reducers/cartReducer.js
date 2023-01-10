import { createSlice } from "@reduxjs/toolkit";


 export const slice = createSlice({
    name:'cart',
    initialState: {
        cartProducts: [{}],
    },
    reducers: {
        ADD_TO_CART: (state,action) => {
            state.cartProducts = [...state.cartProducts].push(action.payload) 
        },
        REMOVE_TO_CART: (state,action) => {
            state.email = action.payload
        },
        CLEAN_CART: (state,action) => {
            state.cartProducts = []
        },
    }
 })

 export const {ADD_TO_CART,REMOVE_TO_CART,CLEAN_CART} = slice.actions
 export default slice.reducer