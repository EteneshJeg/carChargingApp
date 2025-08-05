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
        const activeColor = "#000080"; // navy blue
        const inactiveColor = "#1E3A8A";

        return (
          <TouchableOpacity
            key={path}
            onPress={() => navigation.navigate(path)}
            style={styles.tab}
          >
            <View
              style={[
                styles.tabWrapper,
                isActive ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Icon size={20} color={isActive ? activeColor : inactiveColor} />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? activeColor : inactiveColor },
                ]}
              >
                {label}
              </Text>
            </View>
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
    paddingBottom: 10,
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
  tabWrapper: {
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#D9D9D9",
  },
  inactiveTab: {
    backgroundColor: "#fff",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
