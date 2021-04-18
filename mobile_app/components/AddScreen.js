import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AddInfo from './AddInfo'

export default class AddScreen extends Component 
{
  state = {
    
  };
  render() 
  {
    return (
      <AddInfo Token={this.props.route.params.token} navigation={this.props.navigation}></AddInfo>
    )
  }
}