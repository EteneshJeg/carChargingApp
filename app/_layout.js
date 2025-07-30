import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import BottomNav from './components/BottomNav';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Layout({children}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>TechHive</Text>
        </View>

        {/* Main content area */}
        <View style={{flex: 1 }}>
          {children}
        </View>

        {/* Bottom Navigation */}
        <BottomNav />
      </SafeAreaView>
      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1e40af', // Tailwind's blue-900
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    top: 1,
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
