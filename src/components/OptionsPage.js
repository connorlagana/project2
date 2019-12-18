import React, { Component } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import Option from './Option'

class OptionsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticker: "MSFT",
      expirations: ["2019-12-20", "2019-12-27"],
      calls: [],
      toggleExp: false,
      toggleStrike: false,
      currentExp: "2019-12-20",
      currentStrike: ""
    }

  }

  async componentDidMount() {

    this.fetchOptions()
  }

  changeExp = (event) => {
    event.preventDefault()

    this.setState({
      currentExp: event.target.name
    })

  }

  changeStrike = (event) => {
    event.preventDefault()

    this.setState({
      currentStrike: event.target.name
    })

  }

  showExp = (event) => {
    event.preventDefault()

    this.setState({
      toggleExp: !this.state.toggleExp,
    })
  }
  showStrikes = (event) => {
    event.preventDefault()

    this.setState({
      toggleStrike: !this.state.toggleStrike,
    })
  }

  async fetchOptions() {

    let newObj = []

    for (let i = 0; i < this.state.expirations.length; i++) {
      let callsRes = await axios.get(`https://api-v2.intrinio.com/options/${this.state.ticker}?type=call&expiration=${this.state.expirations[i]}&api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)

      let callsOnly = callsRes.data.options
      callsOnly.sort((a, b) => (a.strike > b.strike) ? 1 : -1)

      //not uesed yet
      let callsObj = {
        exp: this.state.expirations[i],
        calls: callsOnly
      }

      // for (let j = 0; j < callsOnly.length; j++) {
      //   let code = callsOnly[j].code
      //   let strike = callsOnly[j].strike
      //   let expiration = callsOnly[j].expiration
      //   let tck = callsOnly[j].ticker
      //   let type = callsOnly[j].type

      //   let priceRes = await axios.get(`https://api-v2.intrinio.com/options/prices/${code}?api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)

      //   let pricesForStrike = priceRes.data.prices
      //   let prices = []
      //   for (let k = 0; k < pricesForStrike.length; k++) {


      //     let priceObj = {
      //       date: pricesForStrike[k].date,
      //       close: pricesForStrike[k].close,
      //       delta: pricesForStrike[k].delta
      //     }
      //     prices.push(priceObj)

      //   }

      //   let obj = {
      //     code: code,
      //     strike: strike,
      //     expiration: expiration,
      //     tck: tck,
      //     type: type,
      //     prices: prices
      //   }

      //   newObj = obj
      // }

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
        <Option
          calls={this.state.calls}
          toggleExp={this.state.toggleExp}
          toggleStrike={this.state.toggleStrike}
          showExp={this.showExp}
          showStrike={this.showStrike}
          currentExp={this.state.currentExp}
          currentStrike={this.state.currentStrike}
          changeExp={this.changeExp}
          changeStrike={this.changeStrike}
        />
      </div >
    )
  }

}

export default OptionsPage