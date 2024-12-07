"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setUser, setLoading } from "./slices/authSlice";
import { serializeUser } from "@/auth";
import { initializeTheme } from "./slices/themeSlice";

export function Providers({ children }) {
  // subscribing to the auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // storing the serialized user in the store
      store.dispatch(setUser(serializeUser(user)));

      store.dispatch(setLoading(false));
    });

    // Initialize theme
    store.dispatch(initializeTheme());

    // cleaning up the subscription
    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
