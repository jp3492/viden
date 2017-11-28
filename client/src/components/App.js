import React, { Component } from 'react';
import 'materialize-css';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './Header';
import AddGame from './AddGame';
import CheckGame from './CheckGame';
import CheckSave from './CheckSave';
import MyGames from './MyGames';
import Game from './Game';

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
                <Route exact path="/game" component={Game} />
                <Route exact path="/games" component={MyGames} />
                <Route exact path="/games/new" component={AddGame} />
                <Route exact path="/games/new/check" component={CheckGame} />
                <Route exact path="/games/new/check/save" component={CheckSave} />
              </div>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

export default connect(null, {fetchUser})(App);
