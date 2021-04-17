import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart(props) {

    var mon = 0, tues = 0, wed=0, thurs = 0, fri = 0, sat = 0, sun = 0
    var days = [mon, tues, wed, thurs, fri, sat, sun]





    if(typeof props.Checkins !== "undefined")
    for (var i = 0; i < props.Checkins.length; i++) {
        var date = new Date(props.Checkins[i].Date)
      

        switch (date.getDay()) {
            case 0:
                sun = sun + 1
                break;

            case 1:
                mon =mon + 1
                break;
            case 2:
                tues =tues + 1
                break;
            case 3:
                wed =wed + 1
                break;
            case 4:
                thurs= thurs + 1
                break;
            case 5:
                fri=fri + 1
                break;
            case 6:
                sat =sat + 1
                break;
        }


     }







    return (
        <div className="container"> 
        
            <div className="row" style={{ width: "100%" }} >
                <div className="col" style={{}}>
                  
                    <Bar
                        data={{
                            labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
                            fontFamily: 'Bungee',
                            fontSize: 30,
                            datasets: [
                                {

                                    data: (typeof props.Checkins !== "undefined") ? [mon,tues,wed,thurs,fri,sat,sun]: [5,8,3,6,9,3,6],
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
                                xAxes: [{ gridLines: { display: false }, ticks: { fontSize: 12, fontFamily: "'Bungee', sans-serif", fontColor: '#000', fontStyle: '500' } }]
                            },

                            legend: {

                                display: false //This will do the task

                            }
                        }
                        }



                    ></Bar>
                </div>
            </div>
        </div>
    )
}

export default BarChart