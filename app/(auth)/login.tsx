import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { login } from "../../auth/authService";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const goToHome = () => {
    router.push("/(tabs)/home");
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/(tabs)/account");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goToHome}>
        <IconSymbol size={28} name="arrow.backward" color={"#F7F9FC"} />
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Don't have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => router.replace("/(auth)/register")}
        >
          Register here
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
    backgroundColor: "#F7F9FC",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#030391",
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
    backgroundColor: "#1488DB",
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
    color: "#1488DB",
    textDecorationLine: "underline",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#1488DB",
    padding: 10,
    borderRadius: 50,
    elevation: 4,
  },
});
