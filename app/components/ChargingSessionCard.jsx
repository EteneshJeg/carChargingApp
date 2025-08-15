import { Dimensions, StyleSheet, Text, View } from "react-native";

import React from "react";
import { format } from "date-fns";

const screenWidth = Math.min(Dimensions.get("window").width, 400);

export default function ChargingSessionCard({ session }) {
  if (!session) return null;

  const {
    chargeBoxID,
    connectorId,
    timestamp,
    stateOfCharge,
    stop: {
      timestamp: stopTime,
      reason,
      totalConsumptionWh,
      totalDurationSecs,
      stateOfCharge: stopSOC,
      price,
    },
  } = session;

  return (
    <View style={[styles.card, { width: screenWidth }]}>
      {/* Badge top right */}
      <View style={styles.header}>
        <Text style={styles.title}>Charging Session</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.badgeText}>Completed</Text>
        </View>
      </View>

      {/* Info Rows */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Station:</Text>
        <Text style={styles.value}>{chargeBoxID}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Connector:</Text>
        <Text style={styles.value}>#{connectorId}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Start Time:</Text>
        <Text style={styles.value}>{format(new Date(timestamp), "PPpp")}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Stop Time:</Text>
        <Text style={styles.value}>{format(new Date(stopTime), "PPpp")}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Energy Used:</Text>
        <Text style={styles.value}>
          {(totalConsumptionWh / 1000).toFixed(2)} kWh
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Duration:</Text>
        <Text style={styles.value}>
          {Math.round(totalDurationSecs / 60)} mins
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>SOC:</Text>
        <Text style={styles.value}>
          {stateOfCharge}% → {stopSOC}%
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Stop Reason:</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.badgeText}>{reason}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Price:</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.badgeText}>{price} ETB</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 25,
    paddingRight: 40,
    borderRadius: 12,
    marginVertical: 10,
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    marginHorizontal: "auto",
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
});
