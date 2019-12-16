import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import StockPage from './components/StockPage'
import { Route } from 'react-router-dom'
import Stocks from './components/Stocks'
import { Bar, Line, Pie } from 'react-chartjs-2'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dowStocks: [],
      currentPage: 'dji'
      // chartData: {}
    }
  }

  async findCompanies() {
    let dowTickers = ['MMM', 'AXP', 'AAPL', 'BA', 'CAT', 'CVX', 'CSCO',
      'XOM', 'GS', 'IBM', 'INTC', 'JNJ', 'JPM', 'MCD', 'MRK', 'MSFT', 'NKE',
      'PFE', 'PG', 'KO', 'HD', 'TRV', 'DIS', 'UTX', 'UNH', 'VZ', 'V',
      'WMT']
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

      let tickerNameObj = {
        ticker: dowTickers[i],
        name: res.data.name,
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

      console.log(this.state.dowStocks)
    }
  }

  async componentDidMount() {
    this.findCompanies()
  }

  render() {
    return (
      <div className="App" >
        {/* <img src={logo} /> */}
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
