import { useEffect } from "react";
import { useRouter } from "expo-router";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { fetchCurrentUser } from "@/store/slices/authSlice";

/**
 * Index screen - routes to the tabs if authenticated (rehydrated by
 * redux-persist), otherwise to login.
 */
export default function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token) {
      // Confirm the persisted token is still valid before trusting it;
      // fetchCurrentUser's rejected case already clears auth state on
      // failure (see authSlice), which will re-render this effect.
      dispatch(fetchCurrentUser());
      router.replace("/(tabs)/habits");
    } else {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, token, router, dispatch]);

  return null;
}
