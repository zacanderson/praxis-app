import React, {useState, useEffect} from 'react';
import Chart from "chart.js";
import { Line } from 'react-chartjs-2'


function LineGraph(props) {
    var mon = 0, tues = 0, wed=0, thurs = 0, fri = 0, sat = 0, sun = 0
    var days = [mon, tues, wed, thurs, fri, sat, sun]

    var am12=0, am1=0, am2=0, am3=0, am4=0, am5=0, am6=0, am7=0, am8=0, am9=0, am10=0, am11=0
    var pm12=0, pm1=0, pm2=0, pm3=0, pm4=0, pm5=0, pm6=0, pm7=0, pm8=0, pm9=0, pm10=0, pm11=0






    if(typeof props.Checkins !== "undefined")

    for (var i = 0; i < props.Checkins.length; i++) {
        var date = new Date(props.Checkins[i].Date)

        console.log(date.getHours())

        switch (date.getHours()) {
            case 0:
                am12 = am12 + 1
                break;

            case 1:
                am1 =am1 + 1
                break;
            case 2:
                am2 =am2 + 1
                break;
            case 3:
                am3 =am3 + 1
                break;
            case 4:
                am4= am4 + 1
                break;
            case 5:
                am5=am5 + 1
                break;
            case 6:
                am6 =am6 + 1
                break;
              

            case 7:
                am7 =am7 + 1
                break;
            case 8:
                am8 =am8 + 1
                break;
            case 9:
                am9 =am9 + 1
                break;
            case 10:
                am10= am10 + 1
                break;
            case 11:
                am11=am11 + 1
                break;
            case 12:
                pm12 =pm12 + 1
                break;
              

            case 13:
                pm1 =pm1 + 1
                break;
            case 14:
                pm2 =pm2 + 1
                break;
            case 15:
                pm3 =pm3 + 1
                break;
            case 16:
                pm4= pm4 + 1
                break;
            case 17:
                pm5=pm5 + 1
                break;
            case 18:
                pm6 =pm6 + 1
                break;
              
            case 19:
                pm7 =pm7 + 1
                break;
            case 20:
                pm8 =pm8 + 1
                break;
            case 21:
                pm9 =pm9 + 1
                break;
            case 22:
                pm10= pm10 + 1
                break;
            case 23:
                pm11=pm11 + 1
                break;
            
        }
      

        


     }







    return (
        <div className="container"> 
        
            <div className="row" style={{ width: "100%" }} >
                <div className="col" style={{}}>
                  
                    <Line
                        data={{
                            labels: ['','','','','','','','','9am','','','','','','3pm','','','','','','9pm','','',''],
                            fontFamily: 'Bungee',
                            fontSize: 30,
                            datasets: [
                                {

                                    data: [am12, am2, am3, am4, am5, am6, am7, am8, am9, am10, am11, pm12, pm2, pm3, pm4, pm5, pm6, pm7, pm8, pm9, pm10, pm11],
                                    backgroundColor: '#EDBBB4',

                                }
                            ]
                        }}
                        width={300}
                        height={330}

                        var options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{ gridLines: { display: false }, ticks: { fontSize: 12, fontFamily: "'Bungee', sans-serif", fontColor: '#000', fontStyle: '500', beginAtZero:'true' } }],
                                xAxes: [{ gridLines: { display: false }, ticks: { fontSize: 12, fontFamily: "'Bungee', sans-serif", fontColor: '#000', fontStyle: '500',  autoSkip: 'true', maxTicksLimit: '20' } }]
                            },

                            legend: {

                                display: false //This will do the task

                            }
                        }
                        }



                    ></Line>
                </div>
            </div>
        </div>
    )
}

export default LineGraph