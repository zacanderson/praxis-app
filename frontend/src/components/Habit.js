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
    const [percent, setPercent] = useState(props.Progress);
    const [hover, setHover] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [message, setMessage] = useState("");

    const bp = require('./bp.js');
    const storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");


    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, { complete: true });

    const editHabit = async event => 
  {
    event.preventDefault();

    percent < 100 ? setPercent(percent + 100 / props.TimesPerOccurence) : setPercent(100);


    
        console.log(percent + 100 / props.TimesPerOccurence);
    
    setTimeout(() => {
       
    

       
    var obj = {
          accessToken:tok, 
          newOccurence:props.Occurence, 
          habitID:props._id, 
          description:props.Description, 
          timesPerOccurence:props.TimesPerOccurence, 
          color:props.Color, 
          icon:props.Icon, 
          progress: percent < 100 ? percent + 100 / props.TimesPerOccurence: percent }


      var js = JSON.stringify(obj);

      try
      {
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
          .then(function (response) 
          {
              var res = response.data;
              if (res.error) 
              {
                  setMessage(res.error);
              }
              else 
              {
                  if( res.error.length > 0 )
                  {
                      setMessage( "API Error:" + res.error );
                  }
                  else
                  {
                      setMessage('Habit has been added');
                      
                  }
              }
          })
          .catch(function (error) 
          {
              setMessage(error);
          });

      }
      catch(e)
      {
          setMessage(e.message);
      }

    }, 300);
      
};





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
                <div onClick={editHabit} style={{ cursor: "pointer" }} className="col">
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
                <div className="col-4 my-col" onClick={() => percent > 0 ? setPercent(percent - 100 / props.TimesPerOccurence) : setPercent(0)} ><img style={{ width: "100%", marginTop: 10, display: hover ? "block" : "none", cursor: "pointer" }} src={UndoButton} alt="habit" /></div>
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
                           
            />

        </div>



    )
}

export default Habit