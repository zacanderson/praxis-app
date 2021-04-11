import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, FlatList,RefreshControl, Button, Image, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import Icons from './Icons'
import Habit from './Habit'




function HabitsList(props) {


    const [connected, setConnected] = useState(false)
    const [results, setResults] = useState([])
    const [update, setUpdate] = useState(0)
    const [refreshing, setRefreshing] = React.useState(false);


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout)); }



    useEffect(async () => {
        setConnected(false)

        console.log(props.Token)
        let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/getHabits/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: props.Token,
                search: ''
            })
        });
        let json = await response.json();
        // console.log(json);
        setResults(json.Habits)


        setConnected(true)
        console.log("SCREEN UPDATE")




    }, [refreshing])


    function doUpdate() {
        setRefreshing(true);
        wait(300).then(() => setRefreshing(false));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(300).then(() => setRefreshing(false));
      }, []);




    return (

      // <TouchableOpacity  activeOpacity={1.0}>

            <ScrollView style={{ marginBottom: 0 }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }

            >
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>




                    {connected && results.map((habitInfo, index) => (
                        <Habit
                            HabitName={habitInfo.HabitName}
                            Description={habitInfo.Description}
                            Occurence={habitInfo.Occurence}
                            TimesPerOccurence={parseInt(habitInfo.TimesPerOccurence)}
                            Color={habitInfo.Color}
                            Icon={habitInfo.Icon}
                            _id={habitInfo._id}
                            LastCheckinDate={habitInfo.LastCheckinDate}
                            CurrentStreak={habitInfo.CurrentStreak}
                            LongestStreak={habitInfo.LongestStreak}
                            Progress={habitInfo.Progress}
                            Percent={habitInfo.Progress.Percent}
                            Date={habitInfo.Progress.currDate}
                            Checkins={habitInfo.Checkins}
                            key={index}
                            Token={props.Token}
                            Navigation={props.Navigation}
                            Refresh={() => doUpdate()}

                        />

                    )
                    )}
                    {/* <Habit />
                <Habit />
                <Habit />
                <Habit />
                <Habit />
                <Habit />
                <Habit />
                <Habit />
                <Habit />
                <Habit />
                <Habit />
                <Habit />
                <Habit /> */}

                </View>

            </ScrollView>
        //</TouchableOpacity>


    )

}


export default HabitsList