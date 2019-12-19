import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'

const LineChart = (props) => {
  return (
    <div>
      <Line id="lineGraph"
        data={props.chartData}
        height={100}
        width={400}
      />
    </div>
  )
}

export default LineChart