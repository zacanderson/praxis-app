import React, { Component } from 'react';
import { StyleSheet, FlatList, Button, View, Text, TextInput, TouchableOpacity  } from 'react-native';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';

var isFocused = true;
var habitName = '';
var description = '';
export default class LoginScreen extends Component 
{
    state = {
      Habits: [],
      addHabitVisible: false
    }

    async componentDidMount() {
      console.log(this.props.route.params.token)
      let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/getHabits/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accessToken: this.props.route.params.token,
          search: ''
        })
      });
      let json = await response.json();
      console.log(json);
      this.setState({Habits: json.Habits});
    }

    async addHabit() {
      let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/addHabit/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accessToken: this.props.route.params.token,
          habitName: habitName,
          description: description,
          occurence: "daily",
          currentDate: "Sun Apr 06 2021 12:10:46 GMT-0400 (Eastern Daylight Time)",
          timesPerOccurence: 3,
          color: "#4c7bc7",
          icon: 2
        })
      });

      let json = await response.json();
      console.log(json);
    }

    render() 
    {
      const toggleModal = () => {
        this.setState({errorVisible: !this.state.errorVisible})
      }
      return (
        <View style={styles.container}>
          <View>
            <Modal style={styles.addHabit} testID={'modal'} isVisible={this.state.errorVisible}>
              <View style={styles.errorBox}>
                <View style={styles.inputView} >
                  <TextInput
                      style={styles.inputText}
                      placeholder="Habit Name..."
                      placeholderTextColor="#003f5c"
                      onChangeText={text => habitName = text}/>
                </View>
                <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Description..."
                    placeholderTextColor="#003f5c"
                    onChangeText={text => description = text}/>
                </View>
                <Button onPress={ () => { toggleModal(); this.addHabit(); }} title="Ok" />
              </View>
            </Modal>
          </View>

          <View style={styles.content}>
          <FlatList
            data={this.state.Habits}
            renderItem={({ item }) => 
                <View style={styles.card}>
                  <View style={styles.habitTitle}>
                    <Text>{item.HabitName}</Text>
                  </View>
                  <View style={styles.habitBody}>
                    <Text>{item.Description}</Text>
                    <Progress.Bar progress={item.Progress.Percent} width={200} />
                    <Button style={{width: '10%'}} title="Update" onPress={ async () => { 
                      let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/editHabit/', {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          accessToken: this.props.route.params.token,
                          color: item.Color,
                          currDate: new Date(),
                          description: item.Description,
                          habitID: item._id,
                          icon: item.Color,
                          newOccurence: 'daily',
                          percent: (((item.TimesPerOccurence * (item.Progress.Percent / 100)) + 1) / item.TimesPerOccurence) * 100,
                          timesPerOccurence: item.TimesPerOccurence
                        })
                        
                      }); 
                      let json = await response.json();
                      console.log((((item.TimesPerOccurence * (item.Progress.Percent / 100)) + 1) / item.TimesPerOccurence) * 100);}}/>
                  </View>
                  
                </View>
              }
              keyExtractor={item => item._id}
          />
          </View>
          <View style={styles.bottomBar}>
            <Button style={styles.bottomBarButton} title="Home" onPress={() => this.props.navigation.navigate('Home')}/>
            <Button style={styles.bottomBarButton} title="Profile???" onPress={() => this.props.navigation.navigate('Add', { token: this.props.route.params.token })}/>
            <Button style={styles.bottomBarButton} title="Add Habit"  onPress={() => this.props.navigation.navigate('Dashboard', { token: this.props.route.params.token } )}/>
      
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    card: {
      borderWidth: 2,
      margin: 5
    },
    habitTitle: {
      alignItems: 'center',
      borderWidth: 1,
    },
    habitBody: {

    },
    addHabit: {
      backgroundColor: '#ffffff'
    },
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