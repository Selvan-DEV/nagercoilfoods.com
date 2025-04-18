import { IUserData } from "@/models/UserManagement/IUserData";
import { useUserStore } from "@/store/site-store/useUserStore";
import { useEffect, useState } from "react";

export const initialUserData = {
  userId: null,
  firstName: "",
  lastName: "",
  isActive: false,
  isPrimeUser: false,
  phoneNumber: 0,
  email: "",
};

const useUser = () => {
  const [userData, setUser] = useState<IUserData>(initialUserData);
  const user = useUserStore((state) => state.user)?.user;

  useEffect(() => {
    if (user) {
      setUser(user);
    } else {
      setUser(initialUserData);
    }
  }, [user]);

  return userData;
};

export default useUser;
