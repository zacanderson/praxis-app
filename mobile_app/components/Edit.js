import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, FlatList, Button, Image, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import Icons from './Icons'


import * as Progress from 'react-native-progress';



function Edit(props) {
   

    const [color, setColor] = useState(props.Color);
    const [habitName, setHabitName] = useState('');
    const [desc, setDesc] = useState(props.Description);
    const [occur, setOccur] = useState(props.Occurence);
    const [amount, setAmount] = useState(props.TimesPerOccurence);
    const [icon, setIcon] = useState(props.Icon);
    const [streak, setStreak] = useState(0)
    const [lstreak, setLStreak] = useState(0)


    const [enableNext, setEnableNext] = useState(false)
    const [enableSave, setEnableSave] = useState(false)
    const [modalVisible, setModalVisible] = useState(props.Show);


    useEffect(() => {


        if (color !== ""  && desc !== "" && occur !== "" && amount !== "" ) {
            setEnableSave(true)

            console.log(props.Token)

        }


    })


    async function editHabit() {
        
        
        var date = new Date()
        console.log(color + " " + habitName + " " + desc + " " + occur + " " + amount + " " + icon)

        let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/editHabit/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken:props.Token, 
                newOccurence:occur, 
                habitID:props._id, 
                description:desc, 
                timesPerOccurence:amount, 
                color:color, 
                icon:props.Icon, 
                percent:props.Percent,
                currDate: date 
            })
        });

        let json = await response.json();
        console.log(json);

        console.log("habit added")
        props.Refresh()

        setTimeout(() => {
            
            props.Hide()
        },5000)
       
       
    }

    async function deleteHabit() {
        var date = new Date()
        console.log(color + " " + habitName + " " + desc + " " + occur + " " + amount + " " + icon)

        let response = await fetch('https://praxis-habit-tracker.herokuapp.com/api/deleteHabit/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken:props.Token, 
                habitID:props._id
            })
        });

        let json = await response.json();
        console.log(json);

        console.log("habit deleted")
        props.Hide()
    }


    useEffect(() => {

        if (props.Checkins.length !== 0) {
            setStreak(props.Checkins[props.Checkins.length - 1].currStreak)
            setLStreak(props.Checkins[props.Checkins.length - 1].longestStreak)

        }
        else {
            setStreak(0)
            setLStreak(0)
        }
    }, [props.Checkins.length])




    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#BAA1A7"

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
            padding: 20,
            borderColor: "black",
            borderWidth: 2
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
            width: "24%",
            backgroundColor: "#797B84",
            borderRadius: 11,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 10,
            marginRight: 20
        },
        loginBtn2: {
            width: "24%",
            backgroundColor: "lightgrey",
            borderRadius: 11,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 10,
            marginRight: 20
        },
        loginText: {
            color: "white"
        }
    });




    return (

        <Modal
            animationType="slide"
            transparent={false}
            visible={props.Show}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(false);
            }}
        >
            <ScrollView style={{ marginLeft: 0 }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginBottom:20 }}>
                    <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>{props.HabitName}</Text>
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
                </View>

                <View style={{ justifyContent:"space-between"}}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>Streak: {streak}</Text>
                    <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}></Text>

                </View>
                
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}> Longest Streak: {lstreak}</Text>
                    <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}></Text>

                </View>
                </View>
               

                <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>Description</Text>
                <View style={{
                    width: "80%",
                    backgroundColor: "#fff",
                    borderRadius: 9,
                    height: 100,
                    marginBottom: 20,


                    padding: 0,
                    borderColor: "black",
                    borderWidth: 2
                }} >
                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        style={{ height: "100%" }}
                        onChangeText={text => setDesc(text)}
                        value={desc}
                    />
                </View>

                <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>Occurrrence</Text>
                <View style={styles.inputView} >


                    <Picker
                        selectedValue={occur}
                        onValueChange={(itemValue, itemIndex) =>
                            setOccur(itemValue)
                        }>
                        <Picker.Item label="" value="daily" />
                        <Picker.Item label="daily" value="daily" />
                        <Picker.Item label="weekly" value="weekly" />
                    </Picker>

                </View>


                <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>Times Per Occurrence</Text>
                <View style={styles.inputView} >
                    <Picker
                        selectedValue={amount + ""}
                        onValueChange={(itemValue, itemIndex) =>
                            setAmount(itemValue)
                        }>
                        <Picker.Item label="" value="1" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                    </Picker>
                </View>


                <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>Pick A Color</Text>
                <View style={{ marginTop: 10 }}>
                    <View style={{ height: 56, flexDirection: "row" }}>
                        <TouchableWithoutFeedback onPressIn={() => setColor("#8DCAD4")}>
                            <View style={{ flex: 0.15, backgroundColor: "#8DCAD4", width: "11%", borderRadius: 100, marginRight: 10, borderColor: "red", borderWidth: color === "#8DCAD4" ? 3 : 0 }}
                            ></View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPressIn={() => setColor("#DBABBE")}>
                            <View style={{ flex: 0.15, backgroundColor: "#DBABBE", width: "11%", borderRadius: 100, marginRight: 10, borderColor: "red", borderWidth: color === "#DBABBE" ? 3 : 0 }}
                            ></View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPressIn={() => setColor("#BAA1A7")}>
                            <View style={{ flex: 0.15, backgroundColor: "#BAA1A7", width: "11%", borderRadius: 100, marginRight: 10, borderColor: "red", borderWidth: color === "#BAA1A7" ? 3 : 0 }}
                            ></View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPressIn={() => setColor("#B7A2CC")}>
                            <View style={{ flex: 0.15, backgroundColor: "#B7A2CC", width: "11%", borderRadius: 100, marginRight: 10, borderColor: "red", borderWidth: color === "#B7A2CC" ? 3 : 0 }}
                            ></View>
                        </TouchableWithoutFeedback>

                    </View>









                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                    {enableSave ?
                        <TouchableOpacity style={styles.loginBtn} onPressIn={editHabit}>
                            <Text style={styles.loginText}>Save</Text>
                        </TouchableOpacity> :


                        <TouchableOpacity style={styles.loginBtn2} >
                            <Text style={styles.loginText}>Save</Text>
                        </TouchableOpacity>


                    }
                    <TouchableOpacity style={styles.loginBtn} onPress={deleteHabit}>
                        <Text style={styles.loginText}>Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginBtn} onPress={() => props.Hide()}>
                        <Text style={styles.loginText}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </Modal>

    )

}

export default Edit