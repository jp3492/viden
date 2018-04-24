import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { fetchUser } from '../actions';

import Header from './Header';
import Body from './Body';
import Player from './Player';
import Login from './Login';

class App extends Component {
  componentWillMount(){
    console.log("need to add: only add needed videos to copy, remove video if neccessary when removing a highlight");
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
