import { StyleSheet, Text, TouchableOpacity } from "react-native";

import React from "react";

export const Button = ({
  title,
  onPress,
  disabled,
  variant = "default",
  size = "default",
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        stylesByVariant[variant],
        stylesBySize[size],
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, textByVariant[variant], textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    marginVertical: 4,
  },
  text: {
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
});

// Variant styles for button container
const stylesByVariant = {
  default: { backgroundColor: "#1E90FF", padding: 12 },
  destructive: { backgroundColor: "#e3342f", padding: 12 },
  outline: { borderWidth: 1, borderColor: "#333", padding: 12 },
  secondary: { backgroundColor: "#6c757d", padding: 12 },
  ghost: { backgroundColor: "transparent", padding: 12 },
  link: { backgroundColor: "transparent", padding: 0 },
};

// Text color styles per variant
const textByVariant = {
  default: { color: "white" },
  destructive: { color: "white" },
  outline: { color: "#333" },
  secondary: { color: "white" },
  ghost: { color: "#333" },
  link: { color: "#1E90FF", textDecorationLine: "underline" },
};

// Size styles for button container
const stylesBySize = {
  default: {},
  sm: { paddingVertical: 6, paddingHorizontal: 12 },
  lg: { paddingVertical: 16, paddingHorizontal: 24 },
  icon: { width: 40, height: 40, borderRadius: 20 },
};
