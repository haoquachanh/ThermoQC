import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import QRCode from "react-native-qrcode-svg"; // Ensure you have this package installed

export default function QRCodeScreen() {
  const qrValue = "https://your-link-here.com"; // Replace with the content you want to encode into QR code

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code</Text>

      {/* QR Code Display */}
      <QRCode value={qrValue} size={200} />

      <Button
        title="Scan Another QR"
        onPress={() => {
          // You can add navigation logic here if needed
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F7F9FC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#030391",
    marginBottom: 20,
  },
});
