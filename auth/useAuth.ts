import { useState, useEffect } from "react";
import { getCurrentUser } from "./authService";

export function useAuth() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(getCurrentUser());
    }, 500); // Poll for user changes (mocked)
    return () => clearInterval(interval);
  }, []);

  return { user };
}
