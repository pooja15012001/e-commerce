import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const socialSlice = createSlice({
  name: "social",
  initialState: {
    like: [],
  },
  reducers: {
    addtoLike: (state, action) => {
      const itemInCart = state.like.find(
        (item) => item?.id == action.payload.id
      );
      console.log(action.payload, "action");
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.like.push({ ...action.payload, quantity: 1 });
      }
    },

    // increment: (state, action) => {
    //   const { postId } = action.payload;
    //   console.log(postId, "actionpostId");
    //   const incrementState = state.like.find(
    //     (item) => item?.id === action.payload
    //   );

    //   console.log(incrementState, "increment");
    //   if (incrementState) {
    //     const value = (state.value += 1);
    //     // incrementState.quantity++;
    //   } else {
    //     state.like.push({ ...action.payload, value: 1 });
    //   }

    //   console.log(incrementState, "incrementProduct");

    //   //   state.value += 1;
    // },
  },
});

export const likeReducer = socialSlice.reducer;
export const { addtoLike } = socialSlice.actions;
