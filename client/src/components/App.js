import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { fetchUser } from '../actions';

import Header from './Header';
import Body from './Body';
import Create from './Create';
import Player from './Player';

class App extends Component {
  componentWillMount(){
    if (this.props.auth === false) {
      this.props.fetchUser();
    }
  }
  render(){
    return(
        <div>
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Header} />
              <Route exact path="/" component={Body} />
              <div>
                <Route path="/player/:id" component={Player} />
              </div>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

const mapStateToProps = ({ auth, main }) => {
  return { auth, main }
}

export default connect(mapStateToProps, {fetchUser})(App);
