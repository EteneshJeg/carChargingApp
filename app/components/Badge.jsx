import { StyleSheet, Text, View } from "react-native";

import React from "react";

export function Badge({ variant = "default", children, style }) {
  const variantStyle = getVariantStyle(variant);

  return (
    <View style={[styles.badge, variantStyle.container, style]}>
      <Text style={[styles.text, variantStyle.text]}>{children}</Text>
    </View>
  );
}

const getVariantStyle = (variant) => {
  switch (variant) {
    case "secondary":
      return {
        container: { backgroundColor: "#E5E7EB" }, 
        text: { color: "#111827" }, 
      };
    case "destructive":
      return {
        container: { backgroundColor: "#DC2626" }, 
        text: { color: "white" },
      };
    case "outline":
      return {
        container: {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#D1D5DB", 
        },
        text: { color: "#111827" }, 
      };
    case "default":
    default:
      return {
        container: { backgroundColor: "#1D4ED8" }, 
        text: { color: "white" },
      };
  }
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});
