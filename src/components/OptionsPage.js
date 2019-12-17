import React, { Component } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'

class OptionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticker: "MSFT",
      expirations: ["2019-12-20", "2019-12-27"],
      calls: []
    }
  }

  async componentDidMount() {

    this.fetchOptions()
  }

  async fetchOptions() {
    for (let i = 0; i < this.state.expirations.length; i++) {
      let callsRes = await axios.get(`https://api-v2.intrinio.com/options/${this.state.ticker}?type=call&expiration=${this.state.expirations[i]}&api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)
      let callsOnly = callsRes.data.options
      this.setState(prev => ({
        calls: [...prev.calls, callsOnly]
      }))
    }

    console.log(this.state.calls)
  }



  render() {
    return (
      <div>
        <p>Options page for {this.state.ticker} goes here</p>
      </div >
    )
  }

}

export default OptionsPage