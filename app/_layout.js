import { StyleSheet, Text, View } from 'react-native';

import BottomNav from './components/BottomNav';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Layout({children}) {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>TechHive</Text>
        </View>

        {/* Main content area */}
        <View style={{ marginTop: 60, flex: 1 }}>
          {children}
        </View>

        {/* Bottom Navigation */}
        <BottomNav />
      </View>
      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1e40af', // Tailwind's blue-900
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stackContainer: {
    marginTop: 60,
    flex: 1,
  },
});
