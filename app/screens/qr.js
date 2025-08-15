import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useContext, useEffect, useRef, useState } from "react";

import ActiveChargingInfo from "../components/ActiveChargingInfo";
import { AuthContext } from "../context/AuthContext";
import { Buffer } from "buffer";
import ChargingSessionCard from "../components/ChargingSessionCard";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const BACKEND_API =
  "https://e-mobility-api.techiveet.com/api/emobility/charging-station-info";

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [station, setStation] = useState(null);
  const [chargingInfo, setChargingInfo] = useState(null);
  const [chargingStatus, setChargingStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const pollingRef = useRef(null);
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
    return () => {
      if (pollingRef.current) clearTimeout(pollingRef.current);
    };
  }, []);

  // Decode Base64
  const decodeBase64Token = (token) => {
    try {
      return Buffer.from(token, "base64").toString("utf8");
    } catch {
      return null;
    }
  };

  const showError = (msg) => {
    Alert.alert("Error", msg);
  };

  const handleChargingStationInfo = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(BACKEND_API, data);
      const result = response.data;

      if (
        result.status === "completed" &&
        (Array.isArray(result.data)
          ? result.data.length === 0
          : Object.keys(result.data || {}).length === 0)
      ) {
        Alert.alert("Info", "No Current Charging Status or Session Found");
      }

      setChargingInfo(result);
      setChargingStatus(result.status);

      if (result.status === "active") {
        if (pollingRef.current) clearTimeout(pollingRef.current);
        pollingRef.current = setTimeout(() => {
          handleChargingStationInfo(data);
        }, 5000);
      }
    } catch (err) {
      showError("Failed to fetch charging station info");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQRCodeScanned = ({ data }) => {
    if (scanned || !data) return;
    setScanned(true);

    const decoded = decodeBase64Token(data);
    if (decoded) {
      try {
        const parsed = JSON.parse(decoded);
        setStation(parsed);
        handleChargingStationInfo(parsed);
        setIsScanning(false);
      } catch {
        showError("Invalid QR: Unable to parse");
      }
    } else {
      showError("Invalid QR: Charging Station not found");
    }

    setTimeout(() => setScanned(false), 2000);
  };

  const startScan = () => {
    setIsScanning(true);
    setStation(null);
    setChargingInfo(null);
    setChargingStatus(null);
  };

  const stopScan = () => {
    setIsScanning(false);
  };

  const handlePayWithTelebirr = () => {
    if (user) navigation.replace("Home");
    else navigation.replace("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {isLoading && !station && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#04233f" />
          </View>
        )}

        {isScanning && !station && (
          <>
            <CameraView
              style={StyleSheet.absoluteFill}
              onBarcodeScanned={handleQRCodeScanned}
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            />

            {/* Scanner Overlay */}
            <View style={styles.overlay}>
              <View style={styles.topOverlay} />
              <View style={styles.middleRow}>
                <View style={styles.sideOverlay} />

                <View style={styles.scannerFrame}>
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />
                </View>

                <View style={styles.sideOverlay} />
              </View>
              <View style={styles.bottomOverlay} />
            </View>
          </>
        )}

        {/* Completed Session */}
        {!isScanning &&
          station &&
          chargingStatus === "completed" &&
          chargingInfo?.data?.length > 0 && (
            <>
              <ChargingSessionCard
                session={chargingInfo.data[0]}
                style={styles.chargingInfoCard}
              />

              <View style={styles.paymentButtons}>
                <TouchableOpacity
                  style={styles.payButton}
                  onPress={handlePayWithTelebirr}
                >
                  <Image
                    source={require("../assets/telebirr.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.payText}>Pay with Telebirr</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.payButton}>
                  <Image
                    source={require("../assets/EBirr.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.payText}>Pay with E-Birr</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

        {/* Active Session */}
        {!isScanning &&
          station &&
          chargingStatus === "active" &&
          chargingInfo?.data?.result?.[0] && (
            <ActiveChargingInfo
              session={chargingInfo.data.result[0]}
              stats={chargingInfo.data.stats}
            />
          )}

        <TouchableOpacity
          style={styles.scanButton}
          onPress={isScanning ? stopScan : startScan}
        >
          <View style={styles.scanButtonContent}>
            {isScanning && (
              <Icon
                name="autorenew"
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={styles.buttonText}>
              {isScanning ? "Stop Scanning" : "Start Scanning"}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    maxWidth: 420,
    width: "100%",
    alignSelf: "center",
    paddingTop: 70,
  },
  chargingInfoCard: {
    marginTop: 40,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scanButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 150,
  },
  scanButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  paymentButtons: {
    marginTop: 15,
    alignItems: "center",
  },
  payButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e40af",
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  payText: {
    color: "#fff",
    fontWeight: "500",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  middleRow: {
    flexDirection: "row",
    width: "100%",
    height: "40%",
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  scannerFrame: {
    width: 250,
    height: 250,
    position: "relative",
    backgroundColor: "transparent",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#777c77ff",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
  },
});
