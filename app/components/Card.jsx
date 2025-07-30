import { StyleSheet, Text, View } from "react-native";

import React from "react";

export function Card(props) {
  return <View style={[styles.card, props.style]} {...props} />;
}

export function CardHeader(props) {
  return <View style={[styles.cardHeader, props.style]} {...props} />;
}

export function CardTitle({ children, style, ...props }) {
  return (
    <Text style={[styles.cardTitle, style]} {...props}>
      {children}
    </Text>
  );
}

export function CardDescription({ children, style, ...props }) {
  return (
    <Text style={[styles.cardDescription, style]} {...props}>
      {children}
    </Text>
  );
}

export function CardContent(props) {
  return <View style={[styles.cardContent, props.style]} {...props} />;
}

export function CardFooter(props) {
  return <View style={[styles.cardFooter, props.style]} {...props} />;
}

export function CardAction(props) {
  return <View style={[styles.cardAction, props.style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    color: "#000", 
    flexDirection: "column",
    gap: 24, 
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb", 
    paddingVertical: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280", 
  },
  cardContent: {
    paddingHorizontal: 24,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb", 
  },
  cardAction: {
    alignSelf: "flex-end",
    paddingRight: 24,
  },
});
