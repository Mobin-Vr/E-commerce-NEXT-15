import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';

const initialState = {
   items: [],
};

const useCartStore = create(
   persist((set, get) => ({
      items: initialState.items,

      // Add item to the cart
      addItem: (product) => {
         set(
            produce((state) => {
               const existingItem = state.items.find(
                  (item) => item.product._id === product._id
               );

               // If the item exists, increase quantity, otherwise add it
               existingItem
                  ? (existingItem.quantity += 1)
                  : state.items.push({ product, quantity: 1 });
            })
         );
      },

      // Remove an item from the cart
      removeItem: (productId) => {
         set(
            produce((state) => {
               const itemIndex = state.items.findIndex(
                  (item) => item.product._id === productId
               );

               if (itemIndex !== -1) {
                  const item = state.items[itemIndex];

                  // Decrease quantity if more than 1, else remove item
                  item.quantity > 1
                     ? (item.quantity -= 1)
                     : state.items.splice(itemIndex, 1);
               }
            })
         );
      },

      // Clear all items in the cart
      clearCart: () => {
         set({ items: initialState.items });
      },

      // Calculate the total price of the cart
      getTotalPrice: () => {
         return get().items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
         );
      },

      // Get the quantity of a specific product
      getItemCount: (productId) => {
         const item = get().items.find(
            (item) => item.product._id === productId
         );
         return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,
   })),
   {
      name: 'cart-store', // Key name for storage
      getStorage: () => localStorage, // Use localStorage for persisting the data
   }
);

export default useCartStore;
