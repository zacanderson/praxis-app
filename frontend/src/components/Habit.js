import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { Checkmark } from 'react-checkmark';
import EditButton from '../images/editButton.png'
import UndoButton from '../images/undoButton.png'
import IconsArr from './Icons';
import EditModal from "./EditModal"
//import Icon from '../images/weightlift.png'





function Habit(props) {

    // Create a state for the current percent of the progress bar. Initialized to zero
    const [percent, setPercent] = useState(props.Percent);
    const [hover, setHover] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [message, setMessage] = useState("");
    const [connections, setConnections] = useState(0);



    const bp = require('./bp.js');
    const storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");


    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, { complete: true });

    function editHabit(value) {
        //event.preventDefault();

        var tempPercent
        // percent < 100 ? setPercent(percent + 100 / props.TimesPerOccurence) : setPercent(100);


        var date = new Date();

        if (value === 1) {
            tempPercent = percent < 100 ? percent + 100 / props.TimesPerOccurence : 100;
        }
        else if (value === 2) {
            tempPercent = percent > 0 ? percent - 100 / props.TimesPerOccurence : 0;

        }
        else if (value === 3) {
            tempPercent = 0
            setPercent(0)
            date = new Date(props.Progress.currDate)

        }
        console.log(tempPercent)
        console.log(date)



        // console.log(percent);

        setTimeout(() => {




            var obj = {
                accessToken: tok,
                newOccurence: props.Occurence,
                habitID: props._id,
                description: props.Description,
                timesPerOccurence: props.TimesPerOccurence,
                color: props.Color,
                icon: props.Icon,
                percent: tempPercent,
                currDate: date
            }


            var js = JSON.stringify(obj);

            try {
                // Axios code follows
                var config =
                {
                    method: 'post',
                    url: bp.buildPath('api/editHabit'),        // or api/edit or api/searchcards
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
                        }
                        else {
                            if (res.error.length > 0) {
                                setMessage("API Error:" + res.error);
                            }
                            else {
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



                            }
                        }
                    })
                    .catch(function (error) {
                        setMessage(error);
                    });

            }
            catch (e) {
                setMessage(e.message);
            }

        }, 300);

    };

    function countCheckin() {
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







        var obj = {
            accessToken: tok,

            habitID: props._id,
            description: props.Description,
            currDate: date,
            streak: streak,
            longestStreak: lStreak
        }


        var js = JSON.stringify(obj);

        try {
            // Axios code follows
            var config =
            {
                method: 'post',
                url: bp.buildPath('api/checkIn'),        // or api/edit or api/searchcards
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
                    }
                    else {
                        if (res.error.length > 0) {
                            setMessage("API Error:" + res.error);
                        }
                        else {
                            //setMessage('Habit has been added');

                            console.log(props.Checkins)
                            console.log("CHECKIN ADDED")



                        }
                    }
                })
                .catch(function (error) {
                    setMessage(error);
                });

        }
        catch (e) {
            setMessage(e.message);
        }




    };

    function undoCheckin() {
        var date = new Date()
        var lastDate = new Date(null)


        if (props.Checkins.length !== 0) {
            lastDate = new Date(props.Checkins[props.Checkins.length - 1].Date)
        }






        if (percent === 100 && (lastDate.getDate() === date.getDate())) {





            var obj = {
                accessToken: tok,

                habitID: props._id

            }


            var js = JSON.stringify(obj);

            try {
                // Axios code follows
                var config =
                {
                    method: 'post',
                    url: bp.buildPath('api/undoCheckin'),        // or api/edit or api/searchcards
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
                        }
                        else {
                            if (res.error.length > 0) {
                                setMessage("API Error:" + res.error);
                            }
                            else {
                                setMessage('Habit has been added');
                                console.log("CHECKIN UNDID")


                            }
                        }
                    })
                    .catch(function (error) {
                        setMessage(error);
                    });

            }
            catch (e) {
                setMessage(e.message);
            }


        }

        // percent > 0 ? setPercent(percent - (100 / props.TimesPerOccurence)) : setPercent(0);

        //setPercent(0 - (100 / props.TimesPerOccurence))






        //console.log(percent)

        // editHabit();


    };


    function countProgress() {
        percent < 100 ? setPercent(percent + 100 / props.TimesPerOccurence) : setPercent(100);
        //console.log(percent + 100 / props.TimesPerOccurence);
        editHabit(1);


    }
    function undoProgress() {
        undoCheckin()
        //setPercent(0)
        percent > 0 ? setPercent(percent - 100 / props.TimesPerOccurence) : setPercent(0);

        //console.log(percent - (100 / props.TimesPerOccurence));
        editHabit(2);


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
            setConnections(connections + 1)
            

        }



        if (props.Occurence === "weekly" && (nextMon.getDate() < date.getDate() || pDate.getMonth() !== date.getMonth() || pDate.getFullYear() !== date.getFullYear())) {

            setPercent(0);




        }




    }




    useEffect(() => {


        changePercent()


    },[connections])





    function resetStreak() {





        var obj = {
            accessToken: tok,
            habitID: props._id
        }


        var js = JSON.stringify(obj);

        try {
            console.log("IM IN HERE ")
            // Axios code follows
            var config =
            {
                method: 'post',
                url: bp.buildPath('api/resetStreak'),        // or api/edit or api/searchcards
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
                    }
                    else {
                        if (res.error.length > 0) {
                            setMessage("API Error:" + res.error);
                        }
                        else {
                            console.log('STREAK RESET FOR: ' + props.HabitName);

                        }
                    }
                })
                .catch(function (error) {
                    setMessage(error);
                });

        }
        catch (e) {
            setMessage(e.message);
        }
    }

    return (
        <div className="container-fluid" style={{ marginBottom: 40 }}>

            {/* The progress bar takes the full width of the div */}
            <div
                style={{ width: 140, height: 140, padding: 0 }}
                className="row justify-content-center align-items-center my-row2 mx-auto"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}

            >
                {/* On click, the percent will change based on the  */}
                <div onClick={countProgress} style={{ cursor: "pointer" }} className="col">
                    <CircularProgressbarWithChildren
                        value={percent}
                        background="true"
                        styles={buildStyles({

                            pathColor: props.Color,
                            textColor: '#f88',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#ffffff',

                        })}
                    >
                        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}

                        {
                            percent >= 100 ?
                                <Checkmark size='95px' color={props.Color} /> : <img style={{ width: "50%", marginTop: -5 }} src={IconsArr[props.Icon]} alt="habit" />

                        }               </CircularProgressbarWithChildren>
                </div>
            </div>

            <div
                className="row  justify-content-center align-items-start my-row2 mx-auto" style={{ width: 140, height: 40 }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>

                <div className="col-4 my-col d-flex justify-content-center"><img style={{ width: "100%", marginTop: 10, display: hover ? "block" : "none", cursor: "pointer" }} src={EditButton} alt="habit" onClick={() => setModalShow(true)} /></div>
                <div className="col-4 my-col d-flex justify-content-center" style={{ fontFamily: 'Bungee', fontSize: 15, padding: 0 }}>{props.HabitName}</div>
                <div className="col-4 my-col" onClick={undoProgress} ><img style={{ width: "100%", marginTop: 10, display: hover ? "block" : "none", cursor: "pointer" }} src={UndoButton} alt="habit" /></div>
            </div>

            <EditModal
                show={modalShow}
                onHide={() => setModalShow(false)}
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

            />

        </div>



    )
}

export default Habit