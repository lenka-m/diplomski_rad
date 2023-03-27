import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip,Legend} from "chart.js"
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip,Legend)

function PieChart() {
  return (
    <Pie
    data = {data}
    options={options}
    > </Pie>
  )
}


export default PieChart