import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { Checkmark } from 'react-checkmark';
import EditButton from '../images/editButton.png'
import UndoButton from '../images/undoButton.png'




function Habit() {

    const [percent, setPercent] = useState(0);
    const [hover, setHover] = useState(false);
    const amount = 2
    const progressStyle = {

    }



    return (
        <div className="container-fluid" style={{marginBottom:40}}>


            <div 
                style={{ width: 140, height: 140, padding:0 }}
                className="row justify-content-center align-items-center my-row2 mx-auto"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}

            >

                <div onClick={() => percent < 100 ? setPercent(percent + 100 / amount) : setPercent(100)} style={{ cursor: "pointer" }} className="col">
                    <CircularProgressbarWithChildren
                        value={percent}
                        background="true"
                        styles={buildStyles({

                            pathColor: `rgba(219, 171, 190, ${percent / 100})`,
                            textColor: '#f88',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#ffffff',

                        })}
                    >
                        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}

                        {
                            percent === 100 ?
                                <Checkmark size='95px' color='#DBABBE' /> : <img style={{ width: "50%", marginTop: -5 }} src="https://www.iconsdb.com/icons/preview/black/weightlift-xxl.png" alt="habit" />

                        }               </CircularProgressbarWithChildren>
                </div>
                </div>
                
                    <div 
                        className="row  justify-content-center align-items-start my-row2 mx-auto" style={{width:180, height: 20}}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}>

                        <div className="col-4 my-col d-flex justify-content-center"><img style={{ width: "70%", marginTop: 10, display: hover ? "block" : "none", cursor: "pointer" }} src={EditButton} alt="habit" /></div>
                        <div className="col-4 my-col d-flex justify-content-center" style={{ fontFamily: 'Bungee', fontSize: 20 }}>Gym</div>
                        <div className="col-4 my-col" onClick={() => percent > 0 ? setPercent(percent - 100 / amount) : setPercent(0)} ><img style={{ width: "75%", marginTop: 10, display: hover ? "block" : "none", cursor: "pointer" }} src={UndoButton} alt="habit" /></div>
                    </div>
                
            
        </div>

    )
}

export default Habit