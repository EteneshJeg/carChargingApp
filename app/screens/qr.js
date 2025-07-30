import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import ChargingOverview from "../components/ChargingOverview";
import ChargingSessionCard from "../components/ChargingSessionCard";
import EBirr from "../assets/EBirr.png";
import axios from "axios";
import telebirr from "../assets/telebirr.png";
import { useMutation } from "@tanstack/react-query";

// import Profile from "./profile";




// For QR scanning in React Native you should use a library like:
// react-native-camera or react-native-qrcode-scanner
// html5-qrcode does NOT work in React Native

// So you will need to install for example:
// npm install react-native-qrcode-scanner react-native-permissions react-native-camera

// Import your custom components for charging info cards and images accordingly
// For example, replace web <img> with React Native <Image> components
// And replace Toast notifications with React Native alternatives like react-native-toast-message or react-native-simple-toast

// Here is a simplified version adjusted for React Native:






let toastId = null;

const postStationInfo = async (payload) => {
  const { data } = await axios.post(
    `${WrapperAPI}api/emobility/charging-station-info`,
    payload
  );
  return data;
};

export default function QRScreen({ navigation }) {
  const pollingRef = useRef(null);
  const { mutateAsync } = useMutation(postStationInfo);

  const [chargingStationInfo, setChargingStationInfo] = useState(null);
  const [chargingStatus, setChargingStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [station, setStation] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // NOTE: React Native does not support Html5Qrcode
  // You need to use a React Native QR scanner like react-native-qrcode-scanner
  // Below functions are placeholders to show logic flow
  
  // Simulated scan result handler (replace with actual scanner callback)
  const handleScanResult = async (scannedText) => {
    const decoded = decodeBase64Token(scannedText);
    if (decoded) {
      try {
        const parsed = JSON.parse(decoded);
        setStation(parsed);
        stopScan();
        await handleChargingStationInfo(parsed);
      } catch {
        showUniqueError("Invalid QR: Charging Station not found");
      }
    } else {
      showUniqueError("Invalid QR: Charging Station not found");
    }
  };

  const handleChargingStationInfo = async (data) => {
    try {
      setIsLoading(true);
      const result = await mutateAsync(data);

      if (
        result.status === "completed" &&
        (Array.isArray(result.data) ? result.data.length === 0 : Object.keys(result.data || {}).length === 0)
      ) {
        showUniqueError("No Current Charging Status or Session Found");
      }

      setChargingStationInfo(result);
      setChargingStatus(result.status);

      if (result.status === "active") {
        if (pollingRef.current) clearTimeout(pollingRef.current);

        pollingRef.current = setTimeout(() => {
          handleChargingStationInfo(data);
        }, 5000);
      }
    } catch {
      showUniqueError("Failed to fetch charging station info");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearTimeout(pollingRef.current);
    };
  }, []);

  // Placeholder startScan: integrate with react-native-qrcode-scanner
  const startScan = () => {
    // You would open the QR scanner here and set up a callback to handleScanResult
    setIsScanning(true);
    // e.g. display scanner modal or screen
  };

  const stopScan = () => {
    // Stop scanner and clean up
    setIsScanning(false);
  };

  // const paymentHandler = () => {
  //   // navigation.navigate("Profile");
  // };

  // Toast equivalent in React Native: You can use react-native-toast-message or react-native-simple-toast
  // For demo, simple alert is used here:
  const showUniqueError = (message) => {
    if (!toastId) {
      toastId = true;
      alert(message);
      setTimeout(() => {
        toastId = null;
      }, 3000);
    }
  };

  const decodeBase64Token = (token) => {
    try {
      // React Native does not have atob by default, install 'base-64' package
      // npm install base-64
      const base64 = require("base-64");
      return base64.decode(token);
    } catch (err) {
      return null;
    }
  };

  if (isLoading && station == null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#04233f" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!station && (
          <View style={styles.scannerPlaceholder}>
            <View style={styles.scanButton}>
              <Button title="Start Scanning" onPress={startScan} color="#007AFF" />
            </View>
          </View>
      )}

      {station && chargingStatus === "completed" && chargingStationInfo?.data?.length > 0 && (
        <View>
          <ChargingSessionCard session={chargingStationInfo.data[0]} />

          <View style={styles.paymentButtonsContainer}>
            <TouchableOpacity style={styles.paymentButton}>
              <Image source={telebirr} style={styles.paymentIcon} />
              <Text style={styles.paymentText}>Pay with Telebirr</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentButton}>
              <Image source={EBirr} style={styles.paymentIcon} />
              <Text style={styles.paymentText}>Pay with E-Birr</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {station && chargingStatus === "active" && (
        <ChargingOverview
          session={chargingStationInfo?.data?.result?.[0]}
          stats={chargingStationInfo?.data?.stats}
        />
      )}

      {isScanning && (
        <Button title="Stop Scanning" onPress={stopScan} color="#1e40af" />
      )}
      {!isScanning && (
        <Button
          title={station ? "Start Scanning Again" : "Start Scanning"}
          onPress={startScan}
          color="#1e40af"
        />
      )}

      {/* <Button title="Go to Profile" onPress={paymentHandler} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scannerPlaceholder: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: '45%',
  },
  scanButton: {
    width: '95%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  infoText: {
    marginBottom: 16,
    fontSize: 18,
    color: "#1e40af",
  },
  paymentButtonsContainer: {
    marginTop: 20,
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e40af",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
  paymentIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  paymentText: {
    color: "white",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
