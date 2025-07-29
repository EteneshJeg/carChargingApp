import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { format } from "date-fns";

export default function ChargingSessionCard({ session }) {
  if (!session) return null;

  const {
    chargeBoxID,
    connectorId,
    timestamp,
    stateOfCharge,
    stop,
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
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Charging Session</Text>
        <Text style={styles.badge}>Completed</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Station:</Text>
        <Text>{chargeBoxID}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Connector:</Text>
        <Text style={styles.outlineBadge}>#{connectorId}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Start Time:</Text>
        <Text>{format(new Date(timestamp), "PPpp")}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Stop Time:</Text>
        <Text>{format(new Date(stopTime), "PPpp")}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Energy Consumed:</Text>
        <Text>{(totalConsumptionWh / 1000).toFixed(2)} kWh</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Duration:</Text>
        <Text>{Math.round(totalDurationSecs / 60)} mins</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>SOC (Start → Stop):</Text>
        <Text>
          {stateOfCharge}% → {stopSOC}%
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Stop Reason:</Text>
        <Text style={styles.badge}>{reason}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.badge}>{price} ETB</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#cce4ff",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1e40af",
  },
  badge: {
    backgroundColor: "#ef4444",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  outlineBadge: {
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontWeight: "600",
    color: "#4b5563",
  },
});
