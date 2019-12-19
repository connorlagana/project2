import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import OptionsPage from './OptionsPage'

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
      price: ''
    }
  }

  async fetchCompanyData() {
    let res = await axios.get(`https://api-v2.intrinio.com/companies/${this.state.ticker}?api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)
    let realtimeRes = await axios.get(`https://api-v2.intrinio.com/securities/${this.state.ticker}/prices/realtime?api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)

    this.setState({
      name: res.data.name,
      shortDesc: res.data.short_description,
      longDesc: res.data.long_description,
      ceo: res.data.ceo,
      sector: res.data.sector,
      employees: res.data.employees,
      exchange: res.data.stock_exchange,
      price: realtimeRes.data.last_price
    })
  }

  async componentDidMount() {
    this.fetchCompanyData()
  }



  render() {
    return (
      <div>
        <p id='ticker'>{this.state.ticker}</p>
        <p id='name'>{this.state.name}</p>
        <p id='price'>${this.state.price}</p>
        <p>Sector: {this.state.sector}</p>
        <p>CEO: {this.state.ceo}</p>

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
        <h3>About</h3>
        <p>Short: {this.state.shortDesc}</p>
        <p>Long: {this.state.longDesc}</p>


      </div >
    )
  }

}

export default StockPage