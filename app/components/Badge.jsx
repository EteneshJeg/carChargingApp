import { StyleSheet, Text, View } from "react-native";

import React from "react";

/**
 * Badge component with variants:
 * - default (blue background, white text)
 * - secondary (light gray background, dark text)
 * - destructive (red background, white text)
 * - outline (transparent background, border, dark text)
 *
 * Props:
 * - variant: one of 'default', 'secondary', 'destructive', 'outline' (default: 'default')
 * - children: content inside badge
 * - style: additional style overrides for the container
 */
export function Badge({ variant = "default", children, style }) {
  const variantStyle = getVariantStyle(variant);

  return (
    <View style={[styles.badge, variantStyle.container, style]}>
      <Text style={[styles.text, variantStyle.text]}>{children}</Text>
    </View>
  );
}

// Helper function to get styles based on variant
const getVariantStyle = (variant) => {
  switch (variant) {
    case "secondary":
      return {
        container: { backgroundColor: "#E5E7EB" }, // Tailwind bg-secondary (gray-200)
        text: { color: "#111827" }, // gray-900
      };
    case "destructive":
      return {
        container: { backgroundColor: "#DC2626" }, // red-600
        text: { color: "white" },
      };
    case "outline":
      return {
        container: {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#D1D5DB", // gray-300
        },
        text: { color: "#111827" }, // gray-900
      };
    case "default":
    default:
      return {
        container: { backgroundColor: "#1D4ED8" }, // Tailwind blue-700
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
