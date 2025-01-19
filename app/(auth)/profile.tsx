import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { logout } from "../../auth/authService";
import { useRouter } from "expo-router";

// Get screen width for responsiveness
const screenWidth = Dimensions.get("window").width;

export default function ProfileScreen() {
  const [user, setUser] = useState({
    fullname: "John Doe",
    birth: "1990-01-01",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Example avatar
  });
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/(tabs)/account");
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image source={{ uri: user.avatar }} style={styles.avatar} />

      {/* User Info */}
      <Text style={styles.fullname}>{user.fullname}</Text>
      <Text style={styles.birth}>{`Birthdate: ${user.birth}`}</Text>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#1488DB",
    marginBottom: 20,
  },
  fullname: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#030391",
    marginBottom: 10,
  },
  birth: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#1488DB",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
