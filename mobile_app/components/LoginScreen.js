import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';


var loginEmail = "";
var loginPassword = "";

export default class LoginScreen extends Component {
  render() {
    return (


      <View style={styles.container}>
        <View style={{ flex: 0.1, fontFamily: "Bungee-Regular", alignItems: "center" }}>
          <Text style={{ fontFamily: "Bungee-Regular", fontSize: 30 }}>
            Login to get Started
          </Text>
        </View>
        <View style={{flex:0.3}}>

        
        </View>
        <View style={{  alignItems:"center", flex:0.2 }}>
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              onChangeText={text => loginEmail = text} />
          </View>

          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={text => loginPassword = text} />
          </View>
        </View>
<View style={{  alignItems:"center", flex:0.2 }}>
        <TouchableOpacity style={styles.loginBtn}
        onPress={
          async () => { this.props.navigation.navigate('Dashboard', { token: await Login() }); }
        }>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Register')}
        > Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      </View>


      </View>
      /* <Text style={{ fontFamily: 'Bungee-Regular' }}>Praxis App</Text>

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={text => loginEmail = text} />
      </View>

      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={text => loginPassword = text} />
      </View>

      <TouchableOpacity style={styles.loginBtn}
        onPress={
          async () => { this.props.navigation.navigate('Habit', { token: await Login() }); }
        }>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Register')}
        > Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity> */


    );
  }
}

async function Login() {
  let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Login: loginEmail,
      Password: loginPassword
    })
  });
  let json = await response.json();
  console.log(json);
  return json.accessToken;
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




// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#80cced',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     fontWeight: "bold",
//     fontSize: 55,
//     fontFamily: 'Bungee-Regular',
//     color: "#fb5b5a",
//     marginBottom: 40
//   },
//   inputView: {
//     width: "80%",
//     backgroundColor: "#465881",
//     borderRadius: 25,
//     height: 50,
//     marginBottom: 20,
//     justifyContent: "center",
//     padding: 20
//   },
//   inputText: {
//     height: 50,
//     color: "white"
//   },
//   forgot: {
//     color: "white",
//     marginTop: 11,
//     fontSize: 11
//   },
//   loginBtn: {
//     width: "80%",
//     backgroundColor: "#fb5b5a",
//     borderRadius: 25,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//     marginBottom: 10
//   },
//   loginText: {
//     color: "white"
//   }
// });