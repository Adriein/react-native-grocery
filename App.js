import React, { useState, useContext, useEffect } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import ListScreen from './src/screens/ListScreen';
import DetailListScreen from './src/screens/DetailListScreen';
import AccountScreen from './src/screens/AccountScreen';
import AddUsersScreen from './src/screens/AddUsersScreen';
import AddProductsScreen from './src/screens/AddProductsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Context as AuthContext } from './src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as ListProvider } from './src/context/ListContext';

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
    <Tab.Navigator tabBarOptions={{ safeAreaInsets: { bottom: 25 } }}>
      <Tab.Screen name="Listas" component={ListFlowScreen} />
      <Tab.Screen name="Cuenta" component={AccountScreen} />
    </Tab.Navigator>
  );
}

function ListFlowScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Listas de la compra"
        component={ListScreen}
        options={{
          headerRightContainerStyle: {
            paddingRight: 15,
            marginBottom: 8,
          },
          headerRight: () => (
            <Avatar
              rounded
              title="AC"
              size="medium"
              overlayContainerStyle={{ backgroundColor: '#d3d3d3' }}
              onPress={() => navigation.navigate('Cuenta')}
            />
          ),
        }}
      />
      <Stack.Screen name="Detalle Lista" component={DetailListScreen} />
      <Stack.Screen name="Añadir Usuarios" component={AddUsersScreen} />
      <Stack.Screen name="Añadir Productos" component={AddProductsScreen} />
    </Stack.Navigator>
  );
}

function App() {
  const { state } = useContext(AuthContext);
  const [alreadySignIn, setAlreadySignIn] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('username');
      if (user) {
        setAlreadySignIn(true);
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {state.isSignedIn || alreadySignIn ? (
            <Stack.Screen name="List" component={ListFlowScreen} />
          ) : (
            <Stack.Screen name="LogIn" component={LoginStackScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default () => {
  return (
    <AuthProvider>
      <ListProvider>
        <App />
      </ListProvider>
    </AuthProvider>
  );
};
