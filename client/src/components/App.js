import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchUser } from '../actions';

import Header from './Header';
const Home = () => <div>Landing</div>;

class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
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

export default connect(null, {fetchUser})(App);
