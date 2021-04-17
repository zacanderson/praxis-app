import React from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart() {


    return (
        <div className="container">
            <div className="row" style={{width:"100%"}} >
                <div className="col" style={{}}>
                <Bar
                    data={{
                        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
                        fontFamily: 'Bungee',
                        fontSize: 30,
                        datasets: [
                            {
                                
                                data:[6,3,5,7,4,0,1],
                                backgroundColor: '#EDBBB4',
                                
                            }
                        ]
                    }}
                    width={300}
                    height={330}
                  
                    var options = {{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{gridLines: {display:false}, ticks: {fontSize: 12, fontFamily: "'Bungee', sans-serif", fontColor: '#000', fontStyle: '500'}}],
                            xAxes: [{gridLines: {display:false}, ticks: {fontSize: 12, fontFamily: "'Bungee', sans-serif", fontColor: '#000', fontStyle: '500'}}]     
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