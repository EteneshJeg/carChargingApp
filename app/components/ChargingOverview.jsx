import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { format } from "date-fns";

// Badge component
function Badge({ children, color = "#e0e0e0", textColor = "#000" }) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={{ color: textColor, fontSize: 12 }}>{children}</Text>
    </View>
  );
}

// InfoRow component
function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

// Main ChargingOverview component
export default function ChargingOverview({ session, stats }) {
  const {
    chargeBoxID,
    connectorId,
    tagID,
    timestamp,
    currentStateOfCharge,
    user,
  } = session;

  // Derived values
  const energyUsed = `${(stats.totalConsumptionWattHours / 1000).toFixed(
    2
  )} kWh`;
  const duration = `${Math.round(stats.totalDurationSecs / 60)} min`;
  const startTime = format(new Date(timestamp), "PPpp");
  const soc =
    currentStateOfCharge !== undefined ? `${currentStateOfCharge}%` : "—";

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{chargeBoxID}</Text>
        <View style={styles.badgeContainer}>
          <Badge>Connector #{connectorId}</Badge>
          <Badge color="#1e40af" textColor="#fff">
            Charging
          </Badge>
        </View>
      </View>

      {/* Info Rows */}
      <View style={styles.content}>
        <InfoRow label="User" value={user?.firstName ?? "—"} />
        <InfoRow label="Tag ID" value={tagID} />
        <InfoRow label="Start Time" value={startTime} />
        <InfoRow label="SOC (current)" value={soc} />
        <InfoRow label="Energy Used" value={energyUsed} />
        <InfoRow label="Duration" value={duration} />
        <InfoRow label="Price" value={`${stats.totalPrice ?? 0} ETB`} />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8, // This works only in newer versions of React Native
  },
  badge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  content: {
    marginTop: 8,
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
