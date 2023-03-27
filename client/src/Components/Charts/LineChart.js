import React from 'react'
import { Line } from 'react-chartjs-2'
import{Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title} from "chart.js"

ChartJS.register( LineElement, CategoryScale, LinearScale, PointElement, Title)


function LineChart({chartData, title}) {
    const data = {
        labels: ["Jan", "Feb","Mart","April","Maj","Jun","Jul","Avg","Sep","Okt","Nov","Dec"],
        datasets:[{
            label:'Sales of the week',
            data: [3,6,9, 12, 14, 245, 34,15,57,14,80,80],
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
    <div BarChart style={{width:'100%'}}>
        <Line
        data={data}
        options={options}
        ></Line>
    </div>
  )
}

export default LineChart