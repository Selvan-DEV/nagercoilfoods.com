import { ILoginResponse, IUserData } from "@/models/UserManagement/IUserData";

const isSessionStorageAvailable = () => {
  return (
    typeof window !== "undefined" &&
    typeof window.sessionStorage !== "undefined"
  );
};

export const getSessionStorageItem = (itemName: string): unknown => {
  if (!isSessionStorageAvailable()) {
    return null;
  }

  const sessionItem = sessionStorage.getItem(itemName);
  if (!sessionItem || sessionItem === "undefined") {
    return null;
  }

  return JSON.parse(sessionItem);
};

export const setItemToSessionStorage = (itemName: string, item: any): void => {
  const serializedItem = JSON.stringify(item);
  sessionStorage.setItem(itemName, serializedItem);
};

export const getUserToken = (): string => {
  return (
    (
      getSessionStorageItem("user-storage") as {
        state: { user: ILoginResponse };
      }
    )?.state?.user?.token || ""
  );
};

export const getAdminToken = (): string => {
  return (getSessionStorageItem("adminData") as ILoginResponse)?.token || "";
};

export const getUserData = (): IUserData | null => {
  return (
    (getSessionStorageItem("user-storage") as ILoginResponse)?.user || null
  );
};

export const getShopId = (): number => {
  return (
    (getSessionStorageItem("adminData") as ILoginResponse)?.user?.shopId || 0
  );
};

export const getShopAdminData = (): IUserData | null => {
  return (getSessionStorageItem("adminData") as ILoginResponse)?.user || null;
};
