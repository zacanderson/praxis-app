import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

var registerUsername = "";
var registerPassword = "";
var registerFirstName = "";
var registerLastName = "";
var registerEmail = "";


export default class LoginScreen extends Component 
{
    render() 
    {
        return (
        <View style={styles.container}>
            <Text style={styles.logo}>Praxis App</Text>
    
            <View style={styles.inputView} >
            <TextInput
                style={styles.inputText}
                placeholder="Username..."
                placeholderTextColor="#003f5c"
                onChangeText={text => registerUsername = text}/>
            </View>
    
            <View style={styles.inputView} >
            <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Password..."
                placeholderTextColor="#003f5c"
                onChangeText={text => registerPassword = text}/>
            </View>

            <View style={styles.inputView} >
            <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="First Name..."
                placeholderTextColor="#003f5c"
                onChangeText={text => registerFirstName = text}/>
            </View>

            <View style={styles.inputView} >
            <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Last Name..."
                placeholderTextColor="#003f5c"
                onChangeText={text => registerLastName = text}/>
            </View>

            <View style={styles.inputView} >
            <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Email..."
                placeholderTextColor="#003f5c"
                onChangeText={text => registerEmail = text}/>
            </View>
    
            <TouchableOpacity style={styles.loginBtn}
            onPress = {
                () => Register()
            }>
            <Text style={styles.loginText} >Register</Text>
            </TouchableOpacity>
    
            <TouchableOpacity>
            <Text style={styles.loginText} 
                onPress={() => this.props.navigation.goBack()}
                > Go Back</Text>
            </TouchableOpacity>

        </View>
        );
    }
}


async function Register() 
{
  let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/register/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Login: registerEmail,
      Password: registerPassword,
      FirstName: registerEmail,
      LastName: registerEmail,
      Email: registerEmail
    })
  });
  let json = await response.json();
  console.log(json);
}















const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#80cced',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#fb5b5a",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#465881",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    forgot:{
      color:"white",
      marginTop:11,
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
  });