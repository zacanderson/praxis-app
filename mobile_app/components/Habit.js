import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, FlatList, RefreshControl, Button, Image, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import Icons from './Icons'
import ProgressCircle from 'react-native-progress-circle'
import Edit from "./Edit"




function Habits(props) {

    const [percent, setPercent] = useState(props.Percent)
    const [before, setBefore] = useState()
    const [icon, setIcon] = useState(props.Icon)
    const [hold, setHold] = useState(false)
    const [show, setShow] = useState(false)


    function countProgress() {

        setBefore(percent)
        percent < 100 ? setPercent(percent + 100 / props.TimesPerOccurence) : setPercent(100)
        










        console.log(percent)

        editHabit(1)
    }

    function undoProgress() {

        undoCheckin()

        percent > 0 ? setPercent(before - 100 / props.TimesPerOccurence) : setPercent(0);



        editHabit(2)

    }


    function changePercent() {

        var date = new Date()

        var pDate = new Date(props.Progress.currDate)
        var daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        var lastDate = new Date(null)

        if (props.Checkins.length !== 0) {
            lastDate = new Date(props.Checkins[props.Checkins.length - 1].Date)
        }

        //console.log(lastDate.getDate() )

        var nextMon = new Date();
        nextMon.setDate(nextMon.getDate() + (1 + 7 - nextMon.getDay()) % 7);
        // console.log(nextMon.getDate());

        debugger
        if (props.Occurence === "daily" && (pDate.getDate() !== date.getDate() || pDate.getMonth() !== date.getMonth() || pDate.getFullYear() !== date.getFullYear())) {

            if (pDate.getFullYear() > 2010) {
                setPercent(0);

                console.log("PROGRESS BACK TO ZERO :  " + props.HabitName)
                editHabit(3)
            }


            if ((lastDate.getDate() + 1) % daysInMonth.getDate() < date.getDate()) {

                //onsole.log(lastDate.getDate() + 1)
                //console.log(daysInMonth.getDate())
                // console.log(date.getDate())

                console.log("STREAK WOULD RESET FOR THIS HABIT:  " + props.HabitName)

                if (lastDate.getFullYear() === date.getFullYear())
                    resetStreak();
            }


        } else {
           


        }



        if (props.Occurence === "weekly" && ((pDate.getDate() + 7) % daysInMonth.getDate() < date.getDate() || pDate.getMonth() !== date.getMonth() || pDate.getFullYear() !== date.getFullYear())) {

            setPercent(0);


        }

        if (props.Occurence === "weekly" && ((lastDate.getDate() + 14) % daysInMonth.getDate() < date.getDate() || lastDate.getMonth() !== date.getMonth() || lastDate.getFullYear() !== date.getFullYear())) {

            resetStreak();


        }









    }




    useEffect(() => {


        changePercent()


    }, [])

    async function resetStreak() {





        let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/resetStreak/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: props.Token,
                habitID: props._id
            })

        });
        let json = await response.json();
        console.log("STREAK RESET")
    }


    async function editHabit(value) {

        var tempPercent
        var date = new Date();

        if (value === 1) {

            if (percent !== 100)
                tempPercent = percent < 100 ? percent + 100 / props.TimesPerOccurence : 100;

            //console.log(tempPercent)
            console.log(props)
        }
        else if (value === 2) {

            tempPercent = before > 0 ? (before - 100 / props.TimesPerOccurence) : 0;


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
                timesPerOccurence: parseInt(props.TimesPerOccurence)
            })

        });
        let json = await response.json();

        var lastDate = new Date(null)
        console.log(props.HabitName + " has made progress");


        if (props.Checkins.length !== 0) {
            lastDate = new Date(props.Checkins[props.Checkins.length - 1].Date)
        }



        if (props.Occurence === "daily" && tempPercent >= (100)
            && (lastDate.getDate() !== date.getDate())) { //|| lastDate.getMonth !== date.getMonth || lastDate.getFullYear() !== date.getFullYear())) {
            console.log("HABIT COMPLETED - LOADING CHECKIN")
            countCheckin();
        }

        console.log("CONNECTED")
    }


    async function countCheckin() {

        var date = new Date()
        console.log(date)

        var streak = 0;
        var lStreak = 0;


        if (props.Checkins.length !== 0) {
            streak = props.Checkins[props.Checkins.length - 1].currStreak;
            lStreak = props.Checkins[props.Checkins.length - 1].longestStreak;



        }

        streak = streak + 1

        if (streak > lStreak)
            lStreak = streak;





        //var js = JSON.stringify(obj);

        let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/checkIn/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: props.Token,
                habitID: props._id,
                description: props.Description,
                currDate: date,
                streak: streak,
                longestStreak: lStreak
            })

        });
        let json = await response.json();
        console.log("CHECKIN ADDED")

    };


    async function undoCheckin() {

        var date = new Date()
        var lastDate = new Date(null)


        if (props.Checkins.length !== 0) {
            lastDate = new Date(props.Checkins[props.Checkins.length - 1].Date)
        }

        console.log(before)

        console.log("IN HERE")





        if (before === 100 && (lastDate.getDate() === date.getDate())) {

            console.log("IN HERE")



            //var js = JSON.stringify(obj);

            let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/undoCheckin/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accessToken: props.Token,
                    habitID: props._id
                })

            });
            let json = await response.json();
            console.log("CHECKIN UNDID")
        }
    };




    function goEdit() {

        //console.log(props.Token)
        props.Navigation.navigate('Edit', { token: props.Token })

    }




    return (


        <View style={{ width: "50%", alignItems: "center", marginTop: 20 }}>
            {show && <Edit
                HabitName={props.HabitName}
                Description={props.Description}
                Occurence={props.Occurence}
                TimesPerOccurence={props.TimesPerOccurence}
                Color={props.Color}
                Icon={props.Icon}
                _id={props._id}
                LastCheckinDate={props.LastCheckinDate}
                CurrentStreak={props.CurrentStreak}
                LongestStreak={props.LongestStreak}
                Progress={props.Progress}
                Checkins={props.Checkins}
                Navigation={props.Navigation}
                Hide={() => setShow(false)}
                Show={show}
                Token={props.Token}
                Percent={percent}
                Refresh ={() => props.Refresh()}
            ></Edit>}

            <TouchableOpacity onPressIn={countProgress} onLongPress={undoProgress}  >
                <ProgressCircle
                    percent={percent}
                    radius={50}
                    borderWidth={8}
                    color={props.Color}
                    shadowColor="#999"
                    bgColor={percent >= 100 ? props.Color : "#fff"}
                >
                    {percent > 100 && <Image source={require('./images/checkmarkDONE.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {percent === 100 && <Image source={require('./images/checkmarkDONE.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}

                    {icon === 0 && percent < 100 && <Image source={require(`./images/icons/${0}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 1 && percent < 100 && <Image source={require(`./images/icons/${1}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 2 && percent < 100 && <Image source={require(`./images/icons/${2}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 3 && percent < 100 && <Image source={require(`./images/icons/${3}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 4 && percent < 100 && <Image source={require(`./images/icons/${4}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 5 && percent < 100 && <Image source={require(`./images/icons/${5}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 6 && percent < 100 && <Image source={require(`./images/icons/${6}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 7 && percent < 100 && <Image source={require(`./images/icons/${7}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 8 && percent < 100 && <Image source={require(`./images/icons/${8}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 9 && percent < 100 && <Image source={require(`./images/icons/${9}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                    {icon === 10 && percent < 100 && <Image source={require(`./images/icons/${10}.png`)} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain' }} />}
                </ProgressCircle>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShow(true) }}>
                <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>{props.HabitName}</Text>
            </TouchableOpacity>




        </View>

    )

}


export default Habits