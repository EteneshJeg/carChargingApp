import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import History from './app/screens/history';
import Home from './app/screens/home';
import Layout from './app/_layout';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './app/screens/profile';
import QR from './app/screens/qr';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function WrappedScreen(ScreenComponent) {
  return (props) => (
    <Layout>
      <ScreenComponent {...props} />
    </Layout>
  );
}

export default function App() {
  return (
     <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={WrappedScreen(Home)} />
            <Stack.Screen name="QR" component={WrappedScreen(QR)} />
            <Stack.Screen name="Profile" component={WrappedScreen(Profile)} />
            <Stack.Screen name="History" component={WrappedScreen(History)} />
          </Stack.Navigator>
        </NavigationContainer>
    </QueryClientProvider>
  );
}
