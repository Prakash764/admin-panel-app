import React, { useState } from 'react'
import './dashboard.css'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, ArcElement, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, BarElement } from 'chart.js';
ChartJS.register(
    Title, ArcElement, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, BarElement
)



export default function StorageInfo(props) {
    const myObj = props.data
    const keyArr = Object.keys(myObj)
    const valueArr = Object.values(myObj)

    const [myData, setmyData] = useState({
        maintainAspectRatio: false,
        responsive: false,
        labels: keyArr.map((item) => item + ' ' + "storage"),
        datasets: [{
            data: valueArr,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    })

    const [options, setoptions] = useState({
        plugins: {
                legend:{
                    labels:{
                        color:'white',
                    }
                },
        }
    })

    return (
        <>
            <div style={{ width: '70%', height: '70%', margin : '0', marginBottom:'20px' }}>
            <h4 className='heading'>Storage Information</h4>
                <Pie data={myData} options={options} />
            </div>
        </>
    )
}