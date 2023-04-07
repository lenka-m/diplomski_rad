import React from 'react'
import { Line } from 'react-chartjs-2'
import{Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title} from "chart.js"

ChartJS.register( LineElement, CategoryScale, LinearScale, PointElement, Title)


function LineChart({chartData, title}) {
    const data = {
        labels: chartData.labels,
        datasets:[{
            label:'Sales of the week',
            data: chartData.numPoints,
            backgroundColor: '#86BD48',
            borderColor:'#86BD48',
            pointBorderColor:'#86BD48',
        }]
    }
    const options = {
        plugins:{
            title:{
                display:true,
                text:title,
                centered:true,
                font:{
                    size:20
                }
            },
            legend:true
        },
        scales:{

        }
    }

  return (
    <div  style={{width:'100%'}}>
        <Line
        data={data}
        options={options}
        ></Line>
    </div>
  )
}

export default LineChart