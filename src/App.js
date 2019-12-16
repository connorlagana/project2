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
      currentPage: 'dji',
      chartData: {
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets: [
          {
            label: 'Population',
            data: [
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
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

      let chartData = dataRes.data.stock_prices
      let histPrices = []
      let dates = []

      for (let i = 0; i < chartData.length; i++) {
        histPrices.push(chartData[i].adj_close)
        dates.push(chartData[i].date)
      }
      let dataObj = {
        datasets: {
          label: "Prices",
          data: histPrices
        },
        labels: dates
      }

      let tickerNameObj = {
        ticker: dowTickers[i],
        name: res.data.name,
        chartData: dataObj
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
