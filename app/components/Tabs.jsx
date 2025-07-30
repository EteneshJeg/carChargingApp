import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function TabTrigger({ label, index, activeIndex, onPress }) {
  const isActive = index === activeIndex;

  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      style={[styles.tabTrigger, isActive && styles.tabTriggerActive]}
      activeOpacity={0.7}
    >
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function Tabs({ children, initialIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const labels =
    React.Children.map(children, (child) => child.props.label) || [];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabList}
      >
        {labels.map((label, i) => (
          <TabTrigger
            key={i}
            label={label}
            index={i}
            activeIndex={activeIndex}
            onPress={setActiveIndex}
          />
        ))}
      </ScrollView>

      <View style={styles.content}>
        {React.Children.toArray(children)[activeIndex]}
      </View>
    </View>
  );
}

export function Tab({ children }) {
  return <View style={{ flex: 1 }}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabList: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6", // muted background
    borderRadius: 10,
    padding: 4,
    margin: 8,
  },
  tabTrigger: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  tabTriggerActive: {
    backgroundColor: "#e0e7ff", // active tab background
  },
  tabLabel: {
    color: "#374151", // muted text
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#1e3a8a", // active tab text color (blue-800)
    fontWeight: "700",
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
