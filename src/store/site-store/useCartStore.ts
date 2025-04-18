import { IAddOrUpdateCartPayload, ICartSummayItems, ICartProducts } from '@/models/OrderManagement/IAddOrUpdateCartPayload';
import { addToCartProduct, fetchCartItems } from '@/services/ProductManagement/ProductsService';
import { getSessionStorageItem, getUserData, setItemToSessionStorage } from '@/shared/SharedService/StorageService';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

type CartState = {
  cart: IAddOrUpdateCartPayload[];
  cartItems: ICartSummayItems | null;

  addToCart: (item: IAddOrUpdateCartPayload) => Promise<void>;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  fetchCart: (id: number | string) => Promise<void>;
};


const sessionStorageStore: PersistStorage<CartState> = {
  getItem: (name) => {
    const item = sessionStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    sessionStorage.removeItem(name);
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      cartItems: null,

      addToCart: async (item) => {
        const state = get();
        const exists = state.cart.find((i) => i.id === item.id);

        let updatedCart: IAddOrUpdateCartPayload[];

        if (exists) {
          updatedCart = state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          updatedCart = [...state.cart, item];
        }

        set({ cart: updatedCart });

        try {
          const res = await addToCartProduct(item);
          if (res) {
            setItemToSessionStorage("sessionId", res.sessionId);
            const userId = getUserData()?.userId || 0;
            await get().fetchCart(userId || res.sessionId);
          }
        } catch (error) {
          console.error('Failed to sync cart to backend:', error);
        }
      },

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ cart: [], cartItems: null }),

      getItemCount: () =>
        (get().cartItems?.cartItems as ICartProducts[] || []).length,

      fetchCart: async (id: string | number) => {
        try {
          const response = await fetchCartItems(id);
          set({ cartItems: response });
          get().getItemCount();
        } catch (err) {
          console.error('Failed to fetch cart:', err);
        }
      },
    }),
    {
      name: 'cart-storage',
      storage: sessionStorageStore,
    }
  )
);
