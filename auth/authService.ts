let currentUser: { id: number; name: string; email: string } | null = null;

export const login = async (email: string, password: string) => {
  // if (email === "test@example.com" && password === "password") {
  if (email === "a" && password === "a") {
    currentUser = { id: 1, name: "Test User", email };
    return currentUser;
  }
  throw new Error("Invalid email or password");
};

export const logout = async () => {
  currentUser = null; // Clear the current user
};

export const getCurrentUser = () => currentUser;

export const register = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  return { userId: Date.now(), email, name: "New User" }; // Mocked registration logic
};
