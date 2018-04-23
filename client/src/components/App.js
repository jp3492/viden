import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { fetchUser } from '../actions';

import Header from './Header';
import Body from './Body';
import Player from './Player';
import Login from './Login';
import Test from './Test';

class App extends Component {
  componentWillMount(){
    const { auth, fetchUser, main: { selectedProject } } = this.props;
    if (auth === false || auth.approved === false) {
      fetchUser();
    }
  }
  render(){
    return(
        <div>
          <BrowserRouter>
            <div>
              <Route path="/" component={Header} />
              <Route exact path="/home" component={Body} />
              <Route exact path="/login" component={Login} />
              <Route path="/player/:id" component={Player} />
              <Route path="/test" component={Test} />
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
