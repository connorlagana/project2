import React from 'react'
import { Link } from 'react-router-dom'
import { Line, Pie } from 'react-chartjs-2'

function Stocks(props) {
  return (
    <div id="allStocksList">
      
      {
        props.stocks.map((stock, key) =>
          <div className="stock" key={key}>
            <Link to={`/${stock.ticker}`}>
              <h3 id="name">{stock.name}</h3>

            </Link>
            <Line id="lineGraph"
              data={stock.chartData}
              height={100}
              width={400}
            />
            <Pie
              data={stock.anal}
              height={50}
            />
            
          </div>
        )
      }

    </div>
  )
}

export default Stocks