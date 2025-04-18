import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { useCartStore } from './useCartStore';
import { SignInFormValues } from '@/components/admin-panel/Login/Login';
import { ILoginResponse } from '@/models/UserManagement/IUserData';
import { customerLogin } from '@/services/UserManagementService/UsersService';
import { setItemToSessionStorage } from '@/shared/SharedService/StorageService';

type UserState = {
  user: ILoginResponse | null;
  login: (loginInfo: SignInFormValues) => Promise<ILoginResponse>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

// ✅ Type-safe sessionStorage
const sessionStorageStore: PersistStorage<UserState> = {
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

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,

      login: async (loginInfo: SignInFormValues) => {
        try {
          const userData = await customerLogin(loginInfo);
          set({ user: userData });
          return userData
        } catch (err) {
          console.error('Login failed:', err);
          throw err;
        }
      },

      logout: () => {
        set({ user: null });
        setItemToSessionStorage("sessionId", null);
        useCartStore.getState().clearCart();
      },

      isLoggedIn: () => !!get().user,
    }),
    {
      name: 'user-storage',
      storage: sessionStorageStore,
    }
  )
);
