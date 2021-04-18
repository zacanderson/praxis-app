import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HabitsList from "./HabitsList"

export default class Dashboard extends Component {


    state = {

    };

    async componentDidMount() {
        console.log(this.props.route.params.token)
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <HabitsList Token={this.props.route.params.token} Navigation={this.props.navigation} />
                </View>

                <View style={styles.bottomBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Add', { token: this.props.route.params.token, navigation: this.props.navigation })}>
                        <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>Add Habit</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF6EC',
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
        backgroundColor: '#797B84',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTopColor: '#DBABBE',
        borderTopWidth: 3
    },
    bottomBarButton: {
        flex: 1,
        margin: 100
    }
});