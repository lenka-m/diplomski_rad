import React from 'react'
import { CategoryScale, LinearScale, Chart as ChartJS, BarController, BarElement, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip,Legend)

function PieChart(chartData, title) {

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title:{
        display:true,
        text:title,
        centered:true,
        font:{
            size:20
        }
      },
      legend: {
            display: true
      }
    },
    scales: {
      x: {
        categoryPercentage: 0.9,
        barPercentage: 0.9,
        offset: true,
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: true,
        },
      },
      y: {
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
        },
      },
    },
  };
  return (
    <div className='BarChart'>
      
    <Pie  data={chartData} options={options} />
  </div>
  )
}


export default PieChart