import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol"; // Your icon component

// Get screen width to make it responsive
const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const [showHeatmap, setShowHeatmap] = useState(false); // State to toggle heatmap visibility

  const generateRandomData = (rows: number, cols: number): number[][] => {
    const data: number[][] = [];
    for (let i = 0; i < rows; i++) {
      data.push([]);
      for (let j = 0; j < cols; j++) {
        data[i].push(Math.random() * 70);
      }
    }
    return data;
  };

  const data = generateRandomData(24, 32);

  const getColorForTemperature = (temp: number) => {
    const red = Math.min(255, temp * 2);
    const green = 0;
    const blue = Math.max(0, 255 - temp * 2);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const goToQRCode = () => {
    // alert("QR Code functionality"); // Implement QR code logic or navigate to QR code page
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      {/* Button to toggle heatmap */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowHeatmap(!showHeatmap)}
      >
        <Text style={styles.buttonText}>
          {showHeatmap ? "Hide Heatmap" : "Show Heatmap"}
        </Text>
      </TouchableOpacity>

      {/* QR Code Button */}
      <TouchableOpacity
        style={styles.qrCodeButtonContainer}
        onPress={goToQRCode}
      >
        <IconSymbol size={50} name="qrcode" color="#030391" />
      </TouchableOpacity>

      {/* Heatmap Section */}
      {showHeatmap && (
        <View style={styles.heatmapContainer}>
          <Text style={styles.heatmapTitle}>Temperature Heatmap</Text>
          <View style={styles.grid}>
            {data.map((row, rowIndex) => (
              <View style={styles.row} key={rowIndex}>
                {row.map((temp, colIndex) => (
                  <View
                    key={colIndex}
                    style={[
                      styles.cell,
                      { backgroundColor: getColorForTemperature(temp) },
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Footer */}
      <Text style={styles.footer}>© 2025 HCMUT ThermoQC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc", // Light background for clean look
    // paddingHorizontal: 16,
  },
  header: {
    backgroundColor: "#1488DB",
    paddingVertical: 20,
    alignItems: "center",
    // borderRadius: 10, // Rounded header for modern feel
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1488DB", // Consistent button color
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  heatmapContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Adds subtle shadow for modern look
    alignItems: "center",
    marginBottom: 20,
  },
  heatmapTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#030391",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "column",
    flexWrap: "wrap",
    flex: 1,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 10, // Adjusted size for better visibility
    height: 10,
  },
  footer: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginTop: 20,
  },
  qrCodeButtonContainer: {
    position: "absolute",
    bottom: -5, // Positioned at the bottom of the screen
    zIndex: 1000,
    left: "50%", // Center horizontally
    transform: [{ translateX: -25 }], // Offset to adjust for the button's width (size / 2)
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
