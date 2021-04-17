import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HabitsList from "./HabitsList"

export default class Dashboard extends Component 
{


  state = {
    
  };

  async componentDidMount() {
    console.log(this.props.route.params.token)
  }

  
  render() 
  {
    return (
      <HabitsList  Token={this.props.route.params.token}/>
    )
  }
}