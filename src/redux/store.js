import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import favReducer from "./reducers/favReducer";

import userReducer from "./reducers/userReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        fav: favReducer
    }
})

export default store