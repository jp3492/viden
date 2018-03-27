import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlayerVideo from './PlayerVideo';
import PlayerList from './PlayerList';
import PlayerControls from './PlayerControls';
import PlayerEdit from './PlayerEdit';
import PlayerHeader from './PlayerHeader';
import PlayerFilter from './PlayerFilter';

class Player extends Component{
  render(){
    return(
      <div id="player" className="row">
        <div id="playerLoad" className="valign-wrapper row">
          <h1 className="col s12">Initiating Player...</h1>
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        </div>
        <div id="playerLeft" className="col s9">
          <PlayerVideo />
          <PlayerControls />
        </div>
        <div id="playerRight" className="col s3">
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <PlayerFilter />
                  <PlayerList />
                </div>
                <div className="card-action">
                  <PlayerEdit />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Player;
