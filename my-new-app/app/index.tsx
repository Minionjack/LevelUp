import { useEffect } from "react";
import { useRouter } from "expo-router";

/**
 * Index screen - automatically redirects to main app (bypasses login)
 */
export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to habits tab, bypassing authentication
    router.replace("/(tabs)/habits");
  }, [router]);

  // Return null since we're redirecting immediately
  return null;
}
