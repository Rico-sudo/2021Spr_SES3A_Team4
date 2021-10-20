import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Main from "./components/Main";
import { SnakeDetectorModelContextProvider } from "./context/SnakeDetectorModelContext";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from './components/pages/Settings';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <SnakeDetectorModelContextProvider>
      <Stack.Navigator initialRouteName="Home" 
        screenOptions={{
          headerShown: false
      }}>
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
      </SnakeDetectorModelContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
