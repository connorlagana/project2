import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'

const PieChart = (props) => {
  return (
    <div>
      <Pie id="pieGraph"
        data={props.pieChartData}
        height={100}
        width={400}
      />
    </div>
  )
}

export default PieChart