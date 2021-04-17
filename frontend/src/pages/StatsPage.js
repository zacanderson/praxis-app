import React, { useState, useEffect } from 'react'
import Calendar from '../components/Calendar'
import Carousel from 'react-bootstrap/Carousel'
import Icons from '../components/Icons'
import axios from 'axios';
import BarChart from '../components/BarChart'
import LineGraph from '../components/LineGraph'



function StatsPage() {

    var d = new Date();
    const [index, setIndex] = useState(0)
    var _results;
    var resultText = '';

    var months = [
        "January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"
    ];


    const [message, setMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const [resultsList, setResultsList] = useState("fsefwe");

    const bp = require('../components/bp.js');
    const storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");


    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, { complete: true });


    useEffect(() => {



        var obj = { accessToken: tok, search: "" };
        var js = JSON.stringify(obj);



        try {

            // Axios code follows
            var config =
            {
                method: 'post',
                url: bp.buildPath('api/getHabits'),        // or api/addcard or api/searchcards
                headers:
                {
                    'Content-Type': 'application/json'
                },
                data: js
            };



            axios(config)

                .then(function (response) {


                    var res = response.data;
                    if (res.error) {
                        setMessage(res.error);
                        console.log(message)

                    }
                    else {
                        _results = res.Habits;


                        setResultsList(_results);
                        setConnected(true);
                        // console.log(_results)




                        //setMessage("Inhere145");





                        for (var i = 0; i < _results.length; i++) {





                            resultText += _results[i].HabitName;
                            if (i < _results.length - 1) {
                                resultText += ', ';

                            }



                        }





                        //setCardList(resultText);
                    }
                })
                .catch(function (error) {
                    setMessage(error);

                });

        }
        catch (e) {
            alert(e.message);
            //setMessage("error")

            //setResults(e.message);
        }




    });









    const handleSelect = (selectedIndex, e) => {

        setIndex(selectedIndex);
        console.log((index + 1) % resultsList.length)

    };



    if (connected === false)
        return (<div></div>)
    else
        return (



            <div className="container-fluid" style={{ marginTop: 80, marginBottom: 0 }}>

                <div className="row justify-content-center" style={{ height: 170 }}>
                    <div className="col-4">

                        <Carousel activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>






                            {resultsList.map(habitInfo => (
                                <Carousel.Item style={{ textAlign: "center", fontFamily: "'Bungee', sans-serif" }}>
                                    <img
                                        className="d-block w-100"
                                        src={Icons[habitInfo.Icon]}
                                        alt=""
                                        style={{ height: 50 }}
                                    />
                                    <br></br>
                                    <h6>{habitInfo.HabitName}</h6>


                                </Carousel.Item>
                            )
                            )}




                        </Carousel>

                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="row justify-content-center align-items-center mx-auto" style={{}}>
                    <div className="col-3" style={{ textAlign: "center", fontFamily: "'Bungee', sans-serif" }}>
                        <h5>Streak:</h5>
                        <br></br>
                        <h3>{(resultsList[index].Checkins.length !== 0) ? resultsList[index].Checkins[resultsList[index].Checkins.length - 1].currStreak : 0}</h3>
                    </div>
                    <div className="col-3" style={{ textAlign: "center", fontFamily: "'Bungee', sans-serif" }}>

                        <h5>Completions:</h5>
                        <br></br>
                        <h3>{(resultsList[index].Checkins.length !== 0) ? resultsList[index].Checkins.length : 0}</h3>
                    </div>
                    <div className="col-3" style={{ textAlign: "center", fontFamily: "'Bungee', sans-serif" }}>
                        <h5>Longest Streak:</h5>
                        <br></br>
                        <h3>{(resultsList[index].Checkins.length !== 0) ? resultsList[index].Checkins[resultsList[index].Checkins.length - 1].longestStreak : 0}</h3>
                    </div>

                </div>

<br></br>
<br></br>
<br></br>
                <div className="row mx-auto justify-content-center" >

                    <div className="col-4" style={{ width: "70%", border: "10px solid #BAA1A7 ", borderRadius: 100, padding: 40, paddingBottom: 100, paddingLeft: 80 }}>
                        <div style={{ height: 300, width: "90%", textAlign: "center", fontSize: 30, fontFamily: "'Bungee', sans-serif" }}>
                            <h2></h2>
                            <BarChart
                                HabitName={connected ? resultsList[index].HabitName : ""}
                                Checkins={connected ? resultsList[index].Checkins : ""} />
                        </div>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-4" style={{ width: "70%", border: "10px solid #BAA1A7 ", borderRadius: 100, padding: 40, paddingBottom: 100, paddingLeft: 80 }}>
                    <div style={{ height: 300, width: "90%", textAlign: "center", fontSize: 30, fontFamily: "'Bungee', sans-serif" }}>
                        <h2></h2>
                        <LineGraph
                            HabitName={connected ? resultsList[index].HabitName : ""}
                            Checkins={connected ? resultsList[index].Checkins : ""} />
                    </div>

                        </div>
                </div>
               
            </div>


        )
}


export default StatsPage