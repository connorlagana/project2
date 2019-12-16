import React, { Component } from 'react'
import axios from 'axios'

class StockPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticker: '',
      name: '',
      shortDesc: '',
      longDesc: ''
    }
  }

  async componentDidMount() {

    // await axios.get(`https://api-v2.intrinio.com/companies/${this.state.ticker}?api_key=OmQzMTBkZjhhNjRhOGM2OTI3MGI1MWUzNzE2ODJlMzY2`)
    //   .then(res => {
    //     this.setState({

    //     })

    //     console.log("STOCK GOES HERE" + this.state.ticker)
    //   })

  }

  render() {
    return (
      <div>
        <h2>Stock Page</h2>
        <p>Ticker: {this.state.ticker}</p>
        <p></p>
      </div >
    )
  }

}

export default StockPage