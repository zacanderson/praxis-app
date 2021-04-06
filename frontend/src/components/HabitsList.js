import React, { useState, useEffect } from 'react';
import Habit from '../components/Habit'
import plusSym from '../images/plusSymbol.png'
import AddButton from '../components/addButton'


function HabitList() {




    return (
        <div className="container" style={{ marginTop: 100 }}>
            <div className="row justify-content-start" style={{}}>
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
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                    <Habit />
                </div>
                <AddButton />
            </div>

        </div>



    )
}

export default HabitList