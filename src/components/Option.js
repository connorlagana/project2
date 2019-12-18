import React from 'react'
import { Link } from 'react-router-dom'
import { Bar, Line, Pie } from 'react-chartjs-2'

function Option(props) {
  return (
    <div id="allOptionsList">
      {
        props.calls.map((callArr, key) =>
          <div className="callArr" key={key}>
            <h2>{callArr[key].expiration}</h2>
            {callArr.map((call, ind) =>
              <div className="call" key={ind}>
                <h4>{call.strike}</h4>
              </div>
            )}
          </div>
        )
      }

    </div>
  )
}

export default Option