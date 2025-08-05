import { AuthContext, AuthProvider } from './app/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import History from './app/screens/history';
import Home from './app/screens/home';
import Layout from './app/_layout';
import LoginScreen from './app/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './app/screens/profile';
import QR from './app/screens/qr';
import { QrProvider } from './app/context/QrContext';
import React from 'react';
import RegisterScreen from './app/screens/RegisterScreen';
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

function MainApp() {
  const { user } = React.useContext(AuthContext);

  return (
    <QrProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <>
              <Stack.Screen name="Profile" component={WrappedScreen(Profile)} />
              <Stack.Screen name="QR" component={WrappedScreen(QR)} />
              <Stack.Screen name="History" component={WrappedScreen(History)} />
              <Stack.Screen name="Home" component={WrappedScreen(Home)} />
              <Stack.Screen name="Register" component={WrappedScreen(RegisterScreen)} />
              <Stack.Screen name="Login" component={WrappedScreen(LoginScreen)} />
            </>
        </Stack.Navigator>
      </NavigationContainer>
    </QrProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <MainApp />
      </QueryClientProvider>
    </AuthProvider>
  );
}
