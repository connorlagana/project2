import React from 'react'
import { Link } from 'react-router-dom'
import { Bar, Line, Pie } from 'react-chartjs-2'

function Option(props) {
  return (
    <div id="allOptionsList">
      <button onClick={props.showOptions}>
        Expires: {props.currentExp}
      </button>


      {
        props.calls.map((callArr, key) =>
          <div className="callArr" key={key}>
            {
              props.toggleExp
                ? (
                  <div className="menu">
                    <button
                      id="exp"
                      onClick={props.changeExp}
                      name={callArr[key].expiration}
                    >
                      {callArr[key].expiration}
                    </button>
                  </div>
                )
                : (
                  null
                )
            }
            {callArr.map((call, ind) =>
              <div className="call" key={ind}>
                {/* <h4>{call.strike}</h4> */}
              </div>
            )}
          </div>
        )
      }

    </div>
  )
}

export default Option