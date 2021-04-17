import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Homescreen extends Component 
{
  state = {
    
  };
  render() 
  {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome To Paraxis!</Text>
          <Button title="Login" onPress={() => this.props.navigation.navigate('Login')}/>
          <Button title="Register" onPress={() => this.props.navigation.navigate('Dahboard')}/>
          <Button title="Habit test" onPress={() => this.props.navigation.navigate('Habit')}/>
      </View>
    )
  }
}