import React, { useState, useEffect } from 'react';
import Habit from '../components/Habit'
import plusSym from '../images/plusSymbol.png'
import AddButton from '../components/addButton'
import axios from 'axios';


function HabitList() {

    var whatever;
    var _results;
    var resultText = '';

    const [message, setMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const [resultsList, setResultsList] = useState("fsefwe");
    const [rerend, setRerend] = useState(0);


    const bp = require('./bp.js');
    const storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");


    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, { complete: true });

    //    var userId = ud.payload.id;
    var userId = ud.payload.userId;
    var firstName = ud.payload.firstName;
    var lastName = ud.payload.lastName;


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

                    }
                    else {
                        _results = res.Habits;


                        setResultsList(_results);
                        setConnected(true);
                        console.log(_results)




                        //setMessage("Inhere145");





                        for (var i = 0; i < _results.length; i++) {





                            resultText += _results[i].HabitName;
                            if (i < _results.length - 1) {
                                resultText += ', ';

                            }
                            //console.log(resultText)


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




    }, [rerend]);





    function doRerend() {
        setTimeout(() => {

            setRerend(rerend + 1)
        }, 1000
        )
    }








    if (connected === false)
        return (<div className="container-fluid" style={{ marginTop: 100}} onClick={doRerend} >
            <div className="row justify-content-start" style={{width:"100%"}}>
            <div className="col" style={{width:"100%"}}>
                        <AddButton />
                    </div>
            </div>
        </div>)
    else
        return (
            <div className="container" style={{ marginTop: 100 }} onClick={doRerend} >
                <div className="row justify-content-start" style={{}}>

                    {resultsList.map(habitInfo => (




                        <div className="col-md-3 col-sm-4 col-xs-6" onClick={doRerend} >
                            <Habit
                                HabitName={habitInfo.HabitName}
                                Description={habitInfo.Description}
                                Occurence={habitInfo.Occurence}
                                TimesPerOccurence={habitInfo.TimesPerOccurence}
                                Color={habitInfo.Color}
                                Icon={habitInfo.Icon}
                                _id={habitInfo._id}
                                LastCheckinDate={habitInfo.LastCheckinDate}
                                CurrentStreak={habitInfo.CurrentStreak}
                                LongestStreak={habitInfo.LongestStreak}
                                Progress={habitInfo.Progress}
                                Checkins={habitInfo.Checkins}



                            />
                        </div>
                    )
                    )}



                    <div className="col-md-3 col-sm-4 col-xs-6" style={{width: 500}}>
                        <AddButton />
                    </div>
                    {/* <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div> */}



                </div>


            </div>



        )
}

export default HabitList