import React, { useState, useEffect } from 'react';
import Habit from '../components/Habit'

function HabitList () {

    return (
        <div className="container" style={{marginTop:100}}>
            <div className="row" style={{}}>
                <div className="col my-col2">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>
                <div className="col">
                    <Habit />
                </div>

            </div>

        </div>
    )
}

export default HabitList