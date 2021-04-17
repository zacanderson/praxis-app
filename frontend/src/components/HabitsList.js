import React, { useState, useEffect } from 'react';
import Habit from '../components/Habit'
import plusSym from '../images/plusSymbol.png'
import AddButton from '../components/addButton'
import axios from 'axios';


function HabitList() {

    var whatever;
    var _results;
    var resultText = '';
    var doReset = []

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
    //var userId = ud.payload.userId;
    //var firstName = ud.payload.firstName;
    //var lastName = ud.payload.lastName;

    
    
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
                        console.log(res.error);
                        setConnected(false);
                        if (res.error === 'Acess token has expired, log back in')
                             window.location.href = '/';




                    }
                    else {
                        _results = res.Habits;


                        setResultsList(_results);
                        setConnected(true);
                        console.log(_results)




                        //setMessage("Inhere145");





                        // for (var i = 0; i < _results.length; i++) {
                        //     //console.log("IM HERE")
                        //     var pDate = new Date (_results[i].Progress.currDate)
                        //     var date = new Date();
                        //     console.log(date)



                        //     if (_results[i].Occurence === "daily" && (pDate.getDate() !== date.getDate() || pDate.getMonth() !== date.getMonth() || pDate.getFullYear() !== date.getFullYear())) {

                        //        // if (pDate.getFullYear() > 2010) {
                        //            doReset.push(true)
                    
                        //             console.log("PROGRESS BACK TO ZERO :  " + _results[i].HabitName)
                    
                        //             // if (connections > 3)
                        //             //     editHabit(3)
                        //        // }
                    
                    
                        //         // if ((lastDate.getDate() + 1) % daysInMonth.getDate() < date.getDate()) {
                    
                        //         //     //onsole.log(lastDate.getDate() + 1)
                        //         //     //console.log(daysInMonth.getDate())
                        //         //     // console.log(date.getDate())
                    
                        //         //     console.log("STREAK WOULD RESET FOR THIS HABIT:  " + props.HabitName)
                    
                        //         //     if (lastDate.getFullYear() === date.getFullYear())
                        //         //         resetStreak();
                        //         // }
                    
                    
                        //     }
                        //     else {
                        //         doReset.push(false)
                               
                        //     }





                            // console.log(_results[0].Occurence)
                            // console.log(doReset)


                            
                            //console.log(resultText)


                      //  }
                        
                        doReset.push(false)
                        





                        //setCardList(resultText);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    if (error === 'Acess token has expired, log back in')
                             window.location.href = '/';
                    setConnected(false);


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

                    {resultsList.map((habitInfo, index) => (




                        <div className="col-md-3 col-sm-4 col-xs-6" onClick={doRerend} key={index} >
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
                                Percent={habitInfo.Progress.Percent}
                                Date={habitInfo.Progress.currDate}
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