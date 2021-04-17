// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import RegisterConfirmScreen from './components/RegisterConfirmScreen';
import HabitScreen from './components/HabitScreen';
import AddPage from './components/AddScreen';
import Dashboard from './components/Dashboard';


var registerEmail = "";
var registerPassword = "";
var loginEmail = "";
var loginPassword = "";
global.authKey = "asdfasdfa";

const RootStack = createStackNavigator();
 
export default App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Add" component={AddPage} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
        <RootStack.Screen name="RegisterConfirm" component={RegisterConfirmScreen} />
        <RootStack.Screen name="Habit" component={HabitScreen} />
        <RootStack.Screen name="Dashboard" component={Dashboard} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

