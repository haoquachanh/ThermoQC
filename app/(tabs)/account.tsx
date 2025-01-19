import React from "react";
import { useAuth } from "../../auth/useAuth";
import LoginScreen from "../(auth)/login";
import ProfileScreen from "../(auth)/profile";

export default function AccountScreen() {
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return <ProfileScreen />;
}
