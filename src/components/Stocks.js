import React from 'react'
import { Link } from 'react-router-dom'
import { Bar, Line, Pie } from 'react-chartjs-2'

function Stocks(props) {
  return (
    <div id="allStocksList">
      {
        props.stocks.map((stock, key) =>
          <div className="stock" key={key}>
            <Link to={`/${stock.ticker}`}>
              <h3 id="name">{stock.name}</h3>
            </Link>
            <Line
              // data={stock.chartData}
            />
          </div>
        )

      }
    </div>
  )
}

export default Stocks