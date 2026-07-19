/**
 * Inventory Slice
 * Redux slice for inventory/currency state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inventory, Item } from '@/types';

const initialState: Inventory = {
  coins: 0,
  items: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    /**
     * Add coins
     */
    addCoins: (state, action: PayloadAction<number>) => {
      state.coins += action.payload;
    },
    
    /**
     * Spend coins
     */
    spendCoins: (state, action: PayloadAction<number>) => {
      if (state.coins >= action.payload) {
        state.coins -= action.payload;
      }
    },
    
    /**
     * Set coins
     */
    setCoins: (state, action: PayloadAction<number>) => {
      state.coins = action.payload;
    },
    
    /**
     * Add item
     */
    addItem: (state, action: PayloadAction<Item>) => {
      const existingItem = state.items.find((i) => i.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    
    /**
     * Remove item
     */
    removeItem: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity -= action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
    },
    
    /**
     * Set inventory
     */
    setInventory: (state, action: PayloadAction<Inventory>) => {
      return action.payload;
    },
  },
});

export const {
  addCoins,
  spendCoins,
  setCoins,
  addItem,
  removeItem,
  setInventory,
} = inventorySlice.actions;

export default inventorySlice.reducer;

