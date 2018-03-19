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
    this.props.fetchUser();
    // alert("Projects are showing double when acces right given");
  }
  render(){
    return(
        <div>
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Header} />
              <Route exact path="/" component={Body} />
              <div>
                <Route exact path="/player" component={Player} />
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
