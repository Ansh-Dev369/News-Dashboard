"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setUser, setLoading } from "./slices/authSlice";
import { serializeUser } from "@/auth";

export function Providers({ children }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      store.dispatch(setUser(serializeUser(user)));
      store.dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
