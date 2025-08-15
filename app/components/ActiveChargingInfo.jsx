import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { format } from "date-fns";

export default function ActiveChargingInfo({ session, stats }) {
  if (!session || !stats) return null;

  return (
    <View style={styles.card}>
      {/* Header with title and badge */}
      <View style={styles.header}>
        <Text style={styles.title}>Charging In Progress</Text>
        <View style={[styles.statusBadge, { backgroundColor: "#2563eb" }]}>
          <Text style={styles.badgeText}>Active</Text>
        </View>
      </View>

      {/* Info rows */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Station:</Text>
        <Text style={styles.value}>{session.chargeBoxID}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Connector:</Text>
        <Text style={styles.value}>#{session.connectorId}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>User:</Text>
        <Text style={styles.value}>{session.user?.firstName || "—"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Start:</Text>
        <Text style={styles.value}>
          {format(new Date(session.timestamp), "PPpp")}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Energy Used:</Text>
        <Text style={styles.value}>
          {(stats.totalConsumptionWattHours / 1000).toFixed(2)} kWh
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Duration:</Text>
        <Text style={styles.value}>
          {Math.round(stats.totalDurationSecs / 60)} mins
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Price:</Text>
        <Text style={[styles.value, styles.price]}>{stats.totalPrice} ETB</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    margin: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
  },
  statusBadge: {
    backgroundColor: "#dc2626",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "500",
    color: "#475569",
  },
  value: {
    color: "#1e293b",
  },
  price: {
    fontWeight: "600",
  },
});
