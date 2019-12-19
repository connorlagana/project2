import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import OptionsPage from './OptionsPage'
import LineChart from './LineChart'
import PieChart from './PieChart';

class StockPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticker: this.props.ticker,
      name: '',
      shortDesc: '',
      longDesc: '',
      ceo: '',
      industry: '',
      employees: '',
      exchange: '',
      price: '',
      chartData: {},
      change: '',
      timeChange: '3 month',
      pieChartData: {},
      buyRating: ''
    }
  }

  async fetchCompanyData() {
    let res = await axios.get(`https://api-v2.intrinio.com/companies/${this.state.ticker}?api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)
    let realtimeRes = await axios.get(`https://api-v2.intrinio.com/securities/${this.state.ticker}/prices/realtime?api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)
    let chartDataRes100Days = await axios.get(`https://api-v2.intrinio.com/securities/${this.state.ticker}/prices?api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)
    let ratingRes = await axios.get(`https://api-v2.intrinio.com/securities/${this.state.ticker}/zacks/analyst_ratings/snapshot?api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)

    let prices100Data = chartDataRes100Days.data.stock_prices
    let pricesToAdd = []
    let datesToAdd = []

    for (let i = 0; i < prices100Data.length; i++) {
      pricesToAdd.push(prices100Data[i].adj_close)
      datesToAdd.push(prices100Data[i].date)
    }

    let changeIn = (pricesToAdd[0] - pricesToAdd[pricesToAdd.length - 1]) / pricesToAdd[0]
    let analLabels = ["Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"]

    let actAnal = [
      ratingRes.data.snapshots[0].strong_buys,
      ratingRes.data.snapshots[0].buys,
      ratingRes.data.snapshots[0].holds,
      ratingRes.data.snapshots[0].strong_sells,
      ratingRes.data.snapshots[0].strong_sells
    ]

    let buys = ratingRes.data.snapshots[0].strong_buys + ratingRes.data.snapshots[0].buys
    let total = ratingRes.data.snapshots[0].strong_buys + ratingRes.data.snapshots[0].buys + ratingRes.data.snapshots[0].strong_sells + ratingRes.data.snapshots[0].sells + ratingRes.data.snapshots[0].holds

    this.setState({
      name: res.data.name,
      shortDesc: res.data.short_description,
      longDesc: res.data.long_description,
      ceo: res.data.ceo,
      sector: res.data.sector,
      employees: res.data.employees,
      exchange: res.data.stock_exchange,
      price: realtimeRes.data.last_price,
      chartData: {
        labels: datesToAdd.reverse(),
        datasets: [
          {
            label: this.state.ticker,
            data: pricesToAdd.reverse(),
            backgroundColor: [
              'rgba(231, 96, 56, 1)',
            ]
          }
        ]
      },
      change: changeIn * 100,
      pieChartData: {
        labels: analLabels,
        datasets: [
          {
            label: "Title Here",
            data: actAnal,
            backgroundColor: [
              'rgb(0, 163, 55)',
              'rgb(128, 254, 109)',
              'rgb(255, 228, 51)',
              'rgb(255, 114, 107)',
              'rgb(255, 54, 54)',
            ]
          }
        ]
      },
      buyRating: (buys / total) * 100
    })
  }

  async componentDidMount() {
    this.fetchCompanyData()
  }



  render() {
    return (
      <div>
        <p id='sector'>Sector: {this.state.sector}</p>
        <p id='ticker'>{this.state.ticker}</p>
        <p id='name'>{this.state.name}</p>
        <p id='price'>${this.state.price}</p>
        <p id='change'>{this.state.timeChange}: {this.state.change}%</p>
        <LineChart
          chartData={this.state.chartData}
        />
        <PieChart
          pieChartData={this.state.pieChartData}
        />

        <p id='ceo'>{this.state.ceo}</p>

        <Route exact path="/:ticker" render={(props) =>
          <Link to={`/${this.state.ticker}/options`}>
            {/* <h3 id="optionsButton">View Options</h3> */}

          </Link>
        } />
        <Route path='/MMM/options' render={(props) => {
          return (
            <OptionsPage
              ticker={props.match.params.ticker}
            />
          )
        }} />
        <h3 id="about">About</h3>
        <p id='desc'>Short: {this.state.shortDesc}</p>
        <p id='desc'>Long: {this.state.longDesc}</p>
        <p>{this.state.buyRating}%</p>


      </div >
    )
  }

}

export default StockPage