import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice.js";
import productsReducer from "./Slices/productSlice.js"
import cartReducer from"./Slices/cartSlice.js"
import orderReducer from "./Slices/orderSlice.js"
export const store = configureStore({
  reducer :{
    user:userReducer,
    products:productsReducer,
   cart:cartReducer,
   order:orderReducer,
  },
});