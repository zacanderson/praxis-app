import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

var confirmationCode = "";


export default class LoginScreen extends Component 
{
    render() 
    {
        return (
        <View style={styles.container}>
            <Text style={styles.logo}>{this.props.route.params.test}</Text>
    
            <View style={styles.inputView} >
            <TextInput
                style={styles.inputText}
                placeholder="Please input your verification code here..."
                placeholderTextColor="#003f5c"
                onChangeText={text => confirmationCode = text}/>
            </View>

            <TouchableOpacity style={styles.loginBtn}
            onPress = {
                () => Confirm()
            }>
            <Text style={styles.loginText}>Verify Code</Text>
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


async function Confirm(userId) 
{
  let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/verification/email-auth/' + userId + '/' + confirmationCode, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Login: confirmationCode
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