import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = () => <div>Header</div>;
const Home = () => <div>Landing</div>;

class App extends Component {

  render(){
    return(
        <div className="container-fluid">
          <BrowserRouter>
            <div>
              <Route path="/" component={Header} />
              <div className="container">
                <Route exact path="/home" component={Home} />
              </div>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
