import React from 'react';
import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, Chart as ChartJS, BarController, BarElement } from 'chart.js'


ChartJS.register(CategoryScale, LinearScale, BarController, BarElement)

function BarChart({ chartData, title }) {
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            color: '#000',
            text: 'Custom Chart Title',
            padding: {
                top: 10,
                bottom: 30
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
      
      <Bar  data={chartData} options={options} />
    </div>
  );
}

export default BarChart;
