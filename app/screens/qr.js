import {
  ActivityIndicator,
  AppState,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { CameraView } from "expo-camera";
import ChargingOverview from "../components/ChargingOverview";
import ChargingSessionCard from "../components/ChargingSessionCard";
import EBirr from "../assets/EBirr.png";
import axios from "axios";
import { decode as base64Decode } from "base-64";
import telebirr from "../assets/telebirr.png";
import { useCameraPermissions } from "expo-camera";
import { useQr } from '../context/QrContext';

// import { useMutation } from "@tanstack/react-query";


let toastId = null;

// Backend call is disabled for now
// const postStationInfo = async (payload) => {
//   console.log(payload)
//   const { data } = await axios.post(
//     `${WrapperAPI}api/emobility/charging-station-info`,
//     payload
//   );
//   console.log(payload)
//   return data;
// };

export default function QRScreen({ navigation }) {
  const pollingRef = useRef(null);
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  // const { mutateAsync } = useMutation(postStationInfo);
  const [permission, requestPermission] = useCameraPermissions();

  const [chargingStationInfo, setChargingStationInfo] = useState(null);
  const [chargingStatus, setChargingStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [station, setStation] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const { scannedData, setScannedData } = useQr();

  // Store parsed decoded object for UI display
  const [decodedData, setDecodedData] = useState(null);

  const handleScanResult = async (scannedText) => {
    setScannedData(scannedText); // save raw scanned string in context

    const decoded = decodeBase64Token(scannedText);
    console.log("Decoded:", decoded);

    if (decoded) {
      try {
        const parsed = JSON.parse(decoded);
        setStation(parsed);
        setDecodedData(parsed);
        stopScan();

        // If you want to call backend later, uncomment this:
        // await handleChargingStationInfo(parsed);
      } catch (err) {
        console.warn(err);
        showUniqueError("Invalid QR: Charging Station not found");
      }
    } else {
      showUniqueError("Invalid QR: Charging Station not found");
    }

    // Keep qrLock locked for 3 seconds to avoid repeated scans
    setTimeout(() => {
      qrLock.current = false;
    }, 3000);
  };

  const handleChargingStationInfo = async (data) => {
    try {
      setIsLoading(true);
      // const result = await mutateAsync(data);

      // if (
      //   result.status === "completed" &&
      //   (Array.isArray(result.data) ? result.data.length === 0 : Object.keys(result.data || {}).length === 0)
      // ) {
      //   showUniqueError("No Current Charging Status or Session Found");
      // }

      // setChargingStationInfo(result);
      // setChargingStatus(result.status);
      // console.log(result)

      // if (result.status === "active") {
      //   if (pollingRef.current) clearTimeout(pollingRef.current);

      //   pollingRef.current = setTimeout(() => {
      //     handleChargingStationInfo(data);
      //   }, 5000);
      // }
    } catch {
      showUniqueError("Failed to fetch charging station info");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearTimeout(pollingRef.current);
      qrLock.current = false;
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const startScan = async () => {
    const permissionResponse = permission ?? (await requestPermission());
    if (permissionResponse.granted) {
      setIsScanning(true);
      qrLock.current = false; // unlock scanning when starting
      setStation(null);
      setDecodedData(null);
      setScannedData(null);
    } else {
      showUniqueError("Camera permission denied");
    }
  };

  const stopScan = () => {
    setIsScanning(false);
  };

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
      return base64Decode(token);
    } catch {
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

  console.log("Raw Scanned:", scannedData);

  return (
    <View style={styles.container}>
      {/* Show raw scanned string */}
      {scannedData && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Raw Scanned String:</Text>
          <Text selectable>{scannedData}</Text>
        </View>
      )}

      {/* Show decoded parsed JSON data */}
      {decodedData && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Decoded Data:</Text>
          <Text selectable>{JSON.stringify(decodedData, null, 2)}</Text>
        </View>
      )}

      {!station && !isScanning && (
        <View style={styles.scannerPlaceholder}>
          <View style={styles.scanButton}>
            <Button title="Start Scanning" onPress={startScan} color="#007AFF" />
          </View>
        </View>
      )}

      {isScanning && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={({ data }) => {
              if (data && !qrLock.current) {
                qrLock.current = true;
                handleScanResult(data);
              }
            }}
          />
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
    paddingTop: "45%",
  },
  scanButton: {
    width: "95%",
    borderRadius: 30,
    overflow: "hidden",
  },
  paymentButtonsContainer: {
    marginTop: 20,
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#193CB8",
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
