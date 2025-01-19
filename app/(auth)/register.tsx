import React, { useState } from "react";
import {
  TextInput,
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { register } from "@/auth/authService";
// Import the register function if it's defined in a service file

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register(email, password); // Ensure register function exists
      router.replace("/(auth)/login"); // Redirect to Login screen after registering
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Extract the message if it's an Error object
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const goToHome = () => {
    router.push("/(tabs)/home"); // Navigate to Home screen
  };

  return (
    <View style={styles.container}>
      {/* Back to Home Button with Icon */}
      <TouchableOpacity style={styles.backButton} onPress={goToHome}>
        <IconSymbol size={28} name="arrow-back" /> {/* Change to valid icon */}
      </TouchableOpacity>

      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/(auth)/login")}>
          Login here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F7F9FC", // Light background for a clean look
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#030391", // Primary color
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#1488DB", // Button with your primary color
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  link: {
    color: "#1488DB", // Same color as the button for consistency
    textDecorationLine: "underline",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#1488DB", // Primary color
    padding: 10,
    borderRadius: 50, // Rounded button
    elevation: 4, // Add shadow for better visual appearance
  },
});
