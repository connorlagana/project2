import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import StockPage from './components/StockPage'
import { Route } from 'react-router-dom'
import Stocks from './components/Stocks'
import { filter } from 'minimatch';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dowStocks: [],
      currentPage: 'dji',
      dowTickers: ['MMM', 'AXP', 'AAPL', 'BA', 'CAT', 'CVX', 'CSCO',
        'XOM', 'GS', 'IBM', 'INTC', 'JNJ', 'MCD', 'MRK', 'MSFT', 'NKE',
        'PFE', 'PG', 'KO', 'HD', 'TRV', 'DIS', 'UTX', 'UNH', 'VZ', 'V',
        'WMT']
    }
  }

  handleFilterChange = (event) => {
    const filterValue = event.target.value
    let tickers = this.state.dowTickers
    let newTickers = []

    for (let i = 0; i < tickers.length; i++) {
      if (tickers[i].includes(filterValue.toUpperCase())) {
        newTickers.push(tickers[i])
      }
    }
    this.setState({
      dowTickers: newTickers
    })
    this.findCompanies()
  }

  async findCompanies() {
    let dowTickers = this.state.dowTickers
    for (let i = 0; i < dowTickers.length; i++) {
      let res = await axios.get(`https://api-v2.intrinio.com/securities/${dowTickers[i]}?api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)
      let dataRes = await axios.get(`https://api-v2.intrinio.com/securities/${dowTickers[i]}/prices?frequency=monthly&api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)
      let ratingRes = await axios.get(`https://api-v2.intrinio.com/securities/${dowTickers[i]}/zacks/analyst_ratings/snapshot?api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)

      let chartData = dataRes.data.stock_prices
      let histPrices = []
      let dates = []

      for (let i = 0; i < chartData.length; i++) {
        histPrices.push(chartData[i].adj_close)
        dates.push(chartData[i].date)
      }

      let analLabels = ["Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"]
      let actAnal = [
        ratingRes.data.snapshots[0].strong_buys,
        ratingRes.data.snapshots[0].buys,
        ratingRes.data.snapshots[0].holds,
        ratingRes.data.snapshots[0].strong_sells,
        ratingRes.data.snapshots[0].strong_sells
      ]


      let tickerNameObj = {
        ticker: dowTickers[i],
        name: res.data.name,
        anal: {
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
        chartData: {
          labels: dates.reverse(),
          datasets: [
            {
              label: dowTickers[i],
              data: histPrices.reverse(),
              backgroundColor: [
                'rgba(231, 96, 56, 1)',
              ]
            }
          ]
        }
      }

      this.setState(prev => ({
        dowStocks: [...prev.dowStocks, tickerNameObj]
      }))

    }
  }

  async componentDidMount() {
    this.findCompanies()
  }

  render() {
    return (
      <div className="App" >
        <Header />
        <Route exact path="/" render={(props) =>
          <Stocks
            stocks={this.state.dowStocks}
            chartData={this.state.chartData}
          />
        } />
        <Route path='/:ticker' render={(props) => {
          return (
            <StockPage
              ticker={props.match.params.ticker}
            />
          )
        }} />
        <Footer />
      </div>
    );
  }


}

export default App;
