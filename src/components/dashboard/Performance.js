import React, { useState } from 'react'
import './dashboard.css'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, BarElement } from 'chart.js';
ChartJS.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, BarElement
)




function Performance(props) {
    const myObj = props.data
    const keyArr = Object.keys(myObj)
    const valueArr = Object.values(myObj)

    const [myData, setmyData] = useState({
        labels: keyArr,
        datasets: [
            {
                label: "# of Hits",
                data: valueArr,
                backgroundColor: keyArr,
                barPercentage: 0.3
            }
        ]
    })

    const [options, setoptions] = useState({
        indexAxis: 'y',  //for horizontal bar
        layout: {
            padding: 17
        },
        plugins: {
            title: {
                display: true,
                text: ' Hits',
                position: 'left',
                color: "white",
            },
            legend:{
                labels:{
                    color:'white',
                }
            },
        },
        scales: {
            y: {
                ticks: {
                    color: "white",
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    color: "white",
                }
            }
        }
    }
    )





    return (
        <>
            <div >
                <h4 className='heading'>Performance</h4>
                <Bar data={myData} options={options} height={260} width={400} />
            </div>
        </>
    )
}
export default Performance;