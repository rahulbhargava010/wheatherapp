import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

const api = {
  key: "e339cfd43f0265965ec65592c997d8e6",
  base: "https://api.openweathermap.org/data/2.5/"
}
class App extends React.Component {

  constructor() {
    super()
    this.state = {
      query: '',
      city: '',
      temp: '',
      country: ''
    }
  }

 
  handleKeyPress = evt => {
    if(evt.key === "Enter") {
      // console.log('event inside: ' + this.state.query)
      fetch(`${api.base}weather?q=${this.state.query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        if(result.cod == "200") {
          this.setState({
            temp: result.main.temp,
            city: result.name,
            country: result.sys.country
          })
        } else {
          this.setState({
            temp: "",
            city: "",
            country: ""
          })
        }
        
      })
    }
  }

  handleChange = e => {
    this.setState({
      query: e.target.value
    })
    console.log(this.state.query)
  }

  render() {
    return (
      <div className="container">
        <div className="card card-body my3">
          <div className="input-group">
            <div className="input-group-prepend">
                <div className="input-group-text bg-primary text-white">
                    L<i className="fa fa-book"/>
                </div>
            </div>
            <input type="text" className="form-control text-capitalize" placeholder="Search Location" value={this.state.query} onChange={this.handleChange} onKeyPress={this.handleKeyPress} /> 
          </div>
          <div className="card card-body">
            <h2>
              {this.state.city ? this.state.city + ", " : " "}
              {this.state.country ? this.state.country + ", " : " "}
            </h2>
            <h1>{this.state.temp ? "Temp: " + this.state.temp : " "}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
