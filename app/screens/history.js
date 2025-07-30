import {
  BatteryCharging,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  XCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const chargingHistory = [
  {
    id: 1,
    date: "2025-06-25",
    station: "Station A",
    amount: 12.5,
    status: "Completed",
    startTime: "14:30",
    endTime: "15:10",
    batteryFrom: 20,
    batteryTo: 85,
  },
  {
    id: 2,
    date: "2025-06-20",
    station: "Station B",
    amount: 8.0,
    status: "Failed",
    startTime: "09:00",
    endTime: "09:30",
    batteryFrom: 45,
    batteryTo: 50,
  },
  {
    id: 3,
    date: "2025-06-15",
    station: "Station C",
    amount: 15.75,
    status: "Completed",
    startTime: "18:00",
    endTime: "19:00",
    batteryFrom: 10,
    batteryTo: 70,
  },
];

export default function History() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Charging History</Text>

      {chargingHistory.map((charge) => {
        const isExpanded = expandedId === charge.id;
        const isCompleted = charge.status === "Completed";

        return (
          <View key={charge.id} style={styles.card}>
            <View style={styles.headerRow}>
              <View style={styles.rowLeft}>
                <Clock color="#2563eb" width={16} height={16} />
                <Text style={styles.dateText}>{charge.date}</Text>
              </View>

              <View style={styles.rowRight}>
                {isCompleted ? (
                  <CheckCircle color="#22c55e" width={20} height={20} />
                ) : (
                  <XCircle color="#ef4444" width={20} height={20} />
                )}
                <Text
                  style={[
                    styles.statusText,
                    isCompleted ? styles.statusCompleted : styles.statusFailed,
                  ]}
                >
                  {charge.status}
                </Text>
              </View>
            </View>

            <View style={styles.stationRow}>
              <MapPin color="#3b82f6" width={20} height={20} />
              <Text style={styles.stationText}>{charge.station}</Text>
            </View>

            <View style={styles.amountRow}>
              <BatteryCharging color="#1e40af" width={20} height={20} />
              <Text style={styles.amountText}>
                ETB {charge.amount.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => toggleExpand(charge.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.detailsButtonText}>Details</Text>
              {isExpanded ? (
                <ChevronUp color="#1e40af" width={18} height={18} />
              ) : (
                <ChevronDown color="#1e40af" width={18} height={18} />
              )}
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.expandedDetails}>
                <Text style={styles.detailText}>
                  <Text style={styles.detailLabel}>Time: </Text>
                  {charge.startTime} - {charge.endTime}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.detailLabel}>Battery: </Text>
                  {charge.batteryFrom}% → {charge.batteryTo}%
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 24,
    color: "#1e40af",
    marginTop:100,

  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    flexDirection: "column",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#2563eb", 
    fontWeight: "500",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusText: {
    fontWeight: "600",
    marginLeft: 4,
  },
  statusCompleted: {
    color: "#16a34a", 
  },
  statusFailed: {
    color: "#dc2626", 
  },
  stationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  stationText: {
    fontWeight: "700",
    fontSize: 16,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  amountText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#1e40af", // blue-700
  },
  detailsButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: "#bfdbfe", // blue-200
  },
  detailsButtonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1e40af",
    marginRight: 6,
  },
  expandedDetails: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#bfdbfe", 
    paddingTop: 12,
  },
  detailText: {
    fontSize: 14,
    color: "#1e40af",
    marginBottom: 6,
  },
  detailLabel: {
    fontWeight: "700",
  },
});
