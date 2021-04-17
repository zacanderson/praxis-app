import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, FlatList, Button, Image, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import Icons from './Icons'
import ProgressCircle from 'react-native-progress-circle'




function Habits(props) {

    const [percent, setPercent] = useState(props.Percent)
    const [icon, setIcon] = useState(props.Icon)

    function countProgress() {
        percent < 100 ? setPercent(percent + 100 / props.TimesPerOccurence) : setPercent(100);
        editHabit(1)
    }

    function undoProgress() {
        percent > 0 ? setPercent(percent - 100 / props.TimesPerOccurence - 100 / props.TimesPerOccurence) : setPercent(0);
        editHabit(2)

    }

     async function editHabit(value) {

        var tempPercent
        var date = new Date();

        if (value === 1) {
            tempPercent = percent //< 100 ? percent + 100 / props.TimesPerOccurence : 100;
            console.log(tempPercent)
        }
        else if (value === 2) {
            tempPercent = percent //> 0 ? percent - 100 / props.TimesPerOccurence : 0;

        }
        else if (value === 3) {
            tempPercent = 0
            setPercent(0)
            date = new Date(props.Progress.currDate)

        }


        let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/editHabit/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: props.Token,
                color: props.Color,
                currDate: date,
                description: props.Description,
                habitID: props._id,
                icon: props.Icon,
                newOccurence: props.Occurence,
                percent: tempPercent,
                timesPerOccurence: props.TimesPerOccurence
            })

        });
        let json = await response.json();

        console.log("CONNECTED")
    }



    return (

        <View style={{ width: "50%", alignItems: "center", marginTop: 20 }}>

            <TouchableOpacity onPressIn={countProgress} onLongPress={undoProgress}  >
                <ProgressCircle
                    percent={percent}
                    radius={50}
                    borderWidth={8}
                    color={props.Color}
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    {icon === 0 && <Image source={require(`./images/icons/${0}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 1 && <Image source={require(`./images/icons/${1}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 2 && <Image source={require(`./images/icons/${2}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 3 && <Image source={require(`./images/icons/${3}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 4 && <Image source={require(`./images/icons/${4}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 5 && <Image source={require(`./images/icons/${5}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 6 && <Image source={require(`./images/icons/${6}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 7 && <Image source={require(`./images/icons/${7}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 8 && <Image source={require(`./images/icons/${8}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 9 && <Image source={require(`./images/icons/${9}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 10 && <Image source={require(`./images/icons/${10}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                </ProgressCircle>
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>{props.HabitName}</Text>


        </View>

    )

}


export default Habits