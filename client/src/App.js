import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      expressionResult: '',
      errorMessage: '',
    }
  }

  
  submitExpression = (e) => {
    e.preventDefault();
    this.setState({errorMessage: ''})
    
    /* Remove non-Latin and other invalid characters, if they were pasted via clipboard */
    const encodedExpression = btoa(this.state.expression.replace(/[^0-9+\-*/().]/g, ''))
    
    this.evaluateExpression(encodedExpression).then(res => {
      if (!res.error) {
        this.setState({ expressionResult: res.result})
      }
      else {
        this.setState({
          expressionResult: '',
          errorMessage: `Error: ${res.message}`})
      }
    }).catch(err => console.log(err))
  }

  evaluateExpression = async (expression) => {
    const response = await fetch(`/calculus?query=${expression}`)
    const body = await response.json();
    if (response.status !== 200 ) throw Error(body.message);
    return body;
  }

  handleExpressionChange = (e) => {
    const value = e.target.value;
    
    /* Disable input of letters */
    if (/[^0-9+\-*/().]/.test(e.target.value)) {
      e.preventDefault()
    }
    else {
      this.setState({expression: e.target.value})      
    }
    
  }

  render() {
    return (
      <div className="Container">

        <div className="Header-Section">
        <h1>Hi there, I’m a  <br/> calculator.</h1>
        <h2>Enter an expression and I will evaluate it*</h2>
        </div>

        <div className="Calc-Section">
          <div className="Label-Cont">
            <span className="Label">Expression</span>          
          </div>
          <form onSubmit={this.submitExpression}>      
          <input
            type="text"
            className={"Floating-Input " + (this.state.errorMessage ? 'Floating-Input-Error' : '')}
            onChange={this.handleExpressionChange}
            value={this.state.expression}/>
          <p className="Error-Message">{this.state.errorMessage}</p>          
            
          </form>
        </div>
        
        {this.state.expressionResult ? (
          <div className="Calc-Section">
            <div className="Label-Cont">
              <span className="Label">Result</span>
            </div>
            <span className="Display-1">{this.state.expressionResult}</span>
          </div>
        ) : null}
        
        <div className="Footer-Section">
        <span className="Label">* — using an API endpoint and BASE64 encoding, of course</span>      
        </div>
      </div>
    );
  }
}

export default App;
