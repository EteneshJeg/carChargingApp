import { Clock, Home, QrCode, User } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import React from "react";

export default function BottomNav() {
  const tabs = [
    { label: "Home", icon: Home, path: "Home" },
    { label: "QR Scanner", icon: QrCode, path: "QR" },
    { label: "History", icon: Clock, path: "History" },
    { label: "Profile", icon: User, path: "Profile" },
  ];

  const navigation = useNavigation();
  const route = useRoute();
  const currentPath = route.name;

  return (
    <View style={styles.footer}>
      {tabs.map(({ label, icon: Icon, path }) => {
        const isActive = currentPath === path;
        return (
          <TouchableOpacity
            key={path}
            onPress={() => {
              console.log("Navigating to:", path);
              navigation.navigate(path);
            }}
            style={[
              styles.tab,
              isActive ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Icon size={20} color={isActive ? "#E0F2FE" : "#1E3A8A"} />
            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? "#E0F2FE" : "#1E3A8A" },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 8,
    paddingBottom: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 6,
    borderRadius: 6,
  },
  inactiveTab: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    borderRadius: 6,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
