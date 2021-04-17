import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, FlatList, Button, Image, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import Icons from './Icons'


import * as Progress from 'react-native-progress';



function AddInfo() {
    const [selectedLanguage, setSelectedLanguage] = useState();

    const [color, setColor] = useState("#EDBBB4");
    const [habitName, setHabitName] = useState('');
    const [desc, setDesc] = useState("");
    const [occur, setOccur] = useState("");
    const [amount, setAmount] = useState("");
    const [icon, setIcon] = useState(-1);
    const [enableNext, setEnableNext] = useState(false)
    const [enableSave, setEnableSave] = useState(false)

    useEffect(() => {

        
        if (color !== "" && habitName !== "" && desc !== "" && occur !== "" && amount !== "" && icon !== -1) {
          setEnableSave(true)

        }
    
    
      })


    




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
            width: "30%",
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
            width: "30%",
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

        <ScrollView style={{ marginLeft: 15 }}>
            <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>Habit Name</Text>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="E.g. Read a book"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setHabitName(text)} />
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
                />
            </View>

            <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 17 }}>Occurrrence</Text>
            <View style={styles.inputView} >


                <Picker
                    selectedValue={selectedLanguage}
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
                    selectedValue={selectedLanguage}
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






                <Text style={{ fontFamily: 'Bungee-Regular', fontSize: 18, marginTop: 40 }}>Pick An Icon</Text>


            </View>
            <View style={{ height: 60, flexDirection: "row" }}>
                <TouchableWithoutFeedback onPressIn={() => setIcon(0)}>
                    <Image source={require('./images/icons/0.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain', borderColor: "red", borderWidth: icon === 0 ? 3 : 0 }} />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPressIn={() => setIcon(1)}>
                    <Image source={require('./images/icons/1.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain', borderColor: "red", borderWidth: icon === 1 ? 3 : 0 }} />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPressIn={() => setIcon(2)}>
                    <Image source={require('./images/icons/2.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain', borderColor: "red", borderWidth: icon === 2 ? 3 : 0 }} />
                </TouchableWithoutFeedback>

            </View>


            <View style={{ height: 60, flexDirection: "row" }}>
                <TouchableWithoutFeedback onPressIn={() => setIcon(3)}>
                    <Image source={require('./images/icons/3.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain', borderColor: "red", borderWidth: icon === 3 ? 3 : 0 }} />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPressIn={() => setIcon(4)}>
                    <Image source={require('./images/icons/4.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain', borderColor: "red", borderWidth: icon === 4 ? 3 : 0 }} />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPressIn={() => setIcon(5)}>
                    <Image source={require('./images/icons/5.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain', borderColor: "red", borderWidth: icon === 5 ? 3 : 0 }} />
                </TouchableWithoutFeedback>

            </View>


            <View style={{ height: 60, flexDirection: "row" }}>
                <TouchableWithoutFeedback onPressIn={() => setIcon(6)}>
                    <Image source={require('./images/icons/6.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain', borderColor: "red", borderWidth: icon === 6 ? 3 : 0 }} />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPressIn={() => setIcon(7)}>
                    <Image source={require('./images/icons/7.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain', borderColor: "red", borderWidth: icon === 7 ? 3 : 0 }} />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPressIn={() => setIcon(8)}>
                    <Image source={require('./images/icons/8.png')} style={{ width: 90, height: 50, flex: 0.5, resizeMode: 'contain', borderColor: "red", borderWidth: icon === 8 ? 3 : 0 }} />
                </TouchableWithoutFeedback>

            </View>
            <View style={{flexDirection: "row", alignItems:"center", justifyContent:"center"}}>

            { enableSave ?
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>Save</Text>
                </TouchableOpacity> :

                <TouchableOpacity style={styles.loginBtn2}>
                    <Text style={styles.loginText}>Save</Text>
                </TouchableOpacity>


            }

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>Cancel</Text>
            </TouchableOpacity>
            </View>

        </ScrollView>

    )

}

export default AddInfo