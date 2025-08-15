import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Clock, CreditCard, LogOut, Power, User } from "lucide-react-native";
import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const recentCharges = [
  { id: 1, date: "2025-06-25", amount: 12.5, station: "Station A" },
  { id: 2, date: "2025-06-20", amount: 8.0, station: "Station B" },
  { id: 3, date: "2025-06-15", amount: 15.75, station: "Station C" },
];

export default function Profile() {
  const [loading, setLoadingPayment] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleContinue = () => {
    setLoadingPayment(!loading);
  };

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  const renderCharge = ({ item }) => (
    <View style={styles.chargeItem}>
      <View>
        <Text style={styles.chargeStation}>{item.station}</Text>
        <View style={styles.chargeRow}>
          <Clock size={14} color="#1e40af" />
          <Text style={styles.chargeDate}>{item.date}</Text>
        </View>
      </View>
      <Text style={styles.chargeAmount}>ETB {item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <User size={48} color="white" />
      </View>

      {/* Client Info */}
      <View style={styles.card}>
        <Text style={styles.name}>{user?.name || "Guest"}</Text>
        <Text style={styles.info}>
          <CreditCard size={18} color="#1e40af" /> Account:{" "}
          {user?.phone_number || "N/A"}
        </Text>
        <Text style={styles.info}>
          <Power size={18} color="#1e40af" /> Status: Active
        </Text>
      </View>

      {/* Recent Charges */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recent Charges</Text>
        <FlatList
          data={recentCharges}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCharge}
        />
      </View>
      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <LogOut size={18} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#1e40af" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  avatar: {
    backgroundColor: "#1e3a8a",
    borderRadius: 50,
    padding: 16,
    marginBottom: 30,
    marginTop: 40,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1e40af",
  },
  info: {
    color: "#1e40af",
    fontSize: 14,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1e40af",
  },
  chargeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#dbeafe",
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 5,
  },
  chargeStation: {
    fontWeight: "500",
    fontSize: 15,
    color: "#1e40af",
  },
  chargeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  chargeDate: {
    marginLeft: 4,
    fontSize: 12,
    color: "#1e40af",
  },
  chargeAmount: {
    fontWeight: "bold",
    color: "#1e40af",
  },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
