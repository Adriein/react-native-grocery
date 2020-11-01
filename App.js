import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import ListScreen from './src/screens/ListScreen';
import DetailListScreen from './src/screens/DetailListScreen';
import AccountScreen from './src/screens/AccountScreen';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider as AuthProvider } from './src/context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoginStackScreen() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function MainFlowStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Listas" component={ListFlowScreen} />
      <Tab.Screen name="Cuenta" component={AccountScreen} />
    </Tab.Navigator>
  );
}

function ListFlowScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Listas" component={ListScreen} />
      <Stack.Screen name="Detalle" component={DetailListScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {isLogged ? (
            <Stack.Screen name="List" component={MainFlowStackScreen} />
          ) : (
            <Stack.Screen name="LogIn" component={LoginStackScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
