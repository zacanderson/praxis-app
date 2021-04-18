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
      <View style={styles.container}>
      <View style={{flex:0.3}}>
      </View>
        <View style={{ flex: 0.1, fontFamily: "Bungee-Regular", alignItems: "center" }}>
          <Text style={{ fontFamily: "Bungee-Regular", fontSize: 30 }}>
            Welcome to Praxis!
          </Text>
        </View>


  <View style={{  alignItems:"center", flex:0.2 }}>
        <TouchableOpacity style={styles.loginBtn}
         onPress={() => this.props.navigation.navigate('Login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn}
      onPress={() => this.props.navigation.navigate('Register')}>
      <Text style={styles.loginText}>Register</Text>
    </TouchableOpacity>
      </View>


      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BAA1A7"

  },
  logo: {
    fontWeight: "bold",
    fontSize: 55,
    fontFamily: 'Bungee-Regular',
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 9,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black"
  },
  forgot: {
    color: "white",
    marginTop: 11,
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#797B84",
    borderRadius: 11,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});
