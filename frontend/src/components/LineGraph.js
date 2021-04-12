import React, {useState, useEffect} from 'react';
import Chart from "chart.js";
import classes from "./LineGraph.module.css";

function LineGraph() {
    chartRef = React.createRef();


    useEffect(() => {

        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Sales",
                        data: [86, 67, 91],
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });



    })

    return (


        <div className={classes.graphContainer}>
        <canvas
            id="myChart"
            ref={this.chartRef}
        />
    </div>
    )
}

export default LineGraph