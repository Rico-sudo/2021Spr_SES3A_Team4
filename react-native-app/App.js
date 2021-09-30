import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {DrawerContent} from './menu/DrawerContent';
export default function App() {
  return (
    <Main />
  );
}
const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} /> }>
        <Drawer.Screen name="Home" component = {MainTabScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
