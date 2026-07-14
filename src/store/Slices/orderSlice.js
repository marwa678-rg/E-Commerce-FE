import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    selectOrder: null,
  },

  reducers: {
    //get my orders ./ get all orders for admin
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    //order Details
    setSelectOrder: (state, action) => {
      state.selectOrder = action.payload;
    },

    // clear order after logout
    clearOrders: (state) => {
      state.orders = [];
      state.selectOrder = null;
    },

    // update order status for admin
    updateOrderStatus: (state, action) => {
      const index = state.orders.findIndex(
        (order) => order._id === action.payload._id,
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
  },
});

export const { setOrders, updateOrderStatus, setSelectOrder, clearOrders } =
  orderSlice.actions;
export default orderSlice.reducer;
