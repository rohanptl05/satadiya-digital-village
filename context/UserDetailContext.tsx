"use client"
import React, { createContext, useState, useEffect, ReactNode } from "react";


export type UserDetail = {
  uid: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string | null;
  approved: boolean | null;
  hamlet: string | null;
};

type UserDetailContextType = {
  userDetail: UserDetail | null;
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetail | null>>;
  loading: boolean;
  isLoggedIn: boolean;
};

export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
  loading: true,
  isLoggedIn: false,
});

type Props = {
  children: ReactNode;
};

export const UserDetailProvider = ({ children }: Props) => {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadUserDetail = async () => {
      try {
        const storedUser =  sessionStorage.getItem("userDetail");
        if (storedUser) {
          setUserDetail(JSON.parse(storedUser));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserDetail();
  }, []);

  useEffect(() => {
    const persistUser = async () => {
      try {
        if (userDetail) {
           sessionStorage.setItem("userDetail", JSON.stringify(userDetail));
          setIsLoggedIn(true);
        } else {
           sessionStorage.removeItem("userDetail");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to save user data", error);
      }
    };

    persistUser();
  }, [userDetail]);

  return (
    <UserDetailContext.Provider
      value={{ userDetail, setUserDetail, loading, isLoggedIn }}
    >
      {children}
    </UserDetailContext.Provider>
  );
};
