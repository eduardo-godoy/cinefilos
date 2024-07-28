import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      user: "userIdLogged",
      updatedAt: new Date().toLocaleString(),
      total: null,
      items: [],
    },
  },
  reducers: {
    addCartItem: (state, { payload }) => {
      const productRepeated = state.value.items.find(
        (item) => item.id === payload.id
      );
      if (productRepeated) {
        console.log(productRepeated);
        const itemsUpdated = state.value.items.map((item) => {
          if (item.id === payload.id) {
            item.quantity += payload.quantity;
            return item;
          }
          return item;
        });
        const total = itemsUpdated.reduce(
          (acc, currentItem) =>
            (acc += currentItem.price * currentItem.quantity),
          0
        );
        state.value = {
          ...state.value,
          items: itemsUpdated,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      } else {
        state.value.items.push(payload);
        const total = state.value.items.reduce(
          (acc, currentItem) =>
            (acc += currentItem.price * currentItem.quantity),
          0
        );
        state.value = {
          ...state.value,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      }
    },
    removeCartItem: (state, { payload }) => {
      const productIndex = state.value.items.findIndex(
          (item) => item.id === payload.id
      )
      if (productIndex !== -1) {
          state.value.items[productIndex].quantity -= payload.quantity
          if (state.value.items[productIndex].quantity <= 0) {
              state.value.items.splice(productIndex, 1)
          }
          const total = state.value.items.reduce(
              (acc, currentItem) => (
                  acc += currentItem.price * currentItem.quantity
              ), 0
          )
          state.value = {
              ...state.value,
              total,
              updateAt: new Date().toLocaleString()
          }
      }
  },
    clearCartItem: (state) => {
      state.value.user = ""
      state.value.updateAt = new Date().toLocaleString()
      state.value.total = null
      state.value.items = []
  }
  },
});

export const { addCartItem, removeCartItem, clearCartItem } = cartSlice.actions;
export default cartSlice.reducer;
