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
      <View style={styles.container}>
        <View style={styles.content}>
          <HabitsList  Token={this.props.route.params.token}/>
        </View>
        
        <View style={styles.bottomBar}>
          <Button style={styles.bottomBarButton} title="Home" onPress={() => this.props.navigation.navigate('Home')}/>
          <Button style={styles.bottomBarButton} title="Add Habit" onPress={() => this.props.navigation.navigate('Add', { token: this.props.route.params.token })}/>
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80cced',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomBarButton: {
    flex: 1,
    margin: 100
  }
});