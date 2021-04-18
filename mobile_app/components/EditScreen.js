import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Edit from "./Edit"

export default class EditScreen extends Component {
    state = {

    };

  
    render() {

        console.log(this.props.token)
        return (
         
                <Edit
                    Token={this.props.token }
                    Navigation={ this.props.navigation}

                    HabitName={this.props.habitName}
                    Description={this.props.Description}
                    Occurence={this.props.Occurence}
                    TimesPerOccurence={this.props.TimesPerOccurence}
                    Color={this.props.Color}
                    Icon={this.props.Icon}
                    _id={this.props._id}
                    Progress={this.props.Progress}
                    Checkins={this.props.Checkins}

                ></Edit>

      
        )
    }
}

