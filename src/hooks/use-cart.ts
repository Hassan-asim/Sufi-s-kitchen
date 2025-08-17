"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Dish } from '@/lib/data';
import { useToast } from './use-toast';

export interface CartItem extends Dish {
  quantity: number;
}

type CartState = {
  items: CartItem[];
  addItem: (item: Dish) => void;
  removeItem: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      totalItems: 0,

      addItem: (item) => {
        const { toast } = useToast.getState();
        const currentItems = get().items;
        const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
          return get().updateItemQuantity(item.id, existingItem.quantity + 1);
        }

        set({ items: [...currentItems, { ...item, quantity: 1 }] });
        get()._recalculateTotals();
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
        get()._recalculateTotals();
      },

      updateItemQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          return get().removeItem(itemId);
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
        get()._recalculateTotals();
      },
      
      clearCart: () => {
        set({ items: [] });
        get()._recalculateTotals();
      },
      
      _recalculateTotals: () => {
        const items = get().items;
        const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        set({ totalPrice, totalItems });
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        // This is a workaround to recalculate totals on hydration
        // because the functions are not part of the persisted state.
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error)
          } else if (state) {
            const items = state.items;
            const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
            const totalItems = items.reduce((total, item) => total + item.quantity, 0);
            set({ items, totalPrice, totalItems });
          }
        }
      }
    }
  )
);
