import React, { Component } from 'react';

class Grid extends Component{

  render(){
    return(
      <div className="row col s12" id="grid">
        <div className="col s4" id="left">
          <div className="row col s12" id="leftTop">
            <div className="col s3" id="pic">
            </div>
            <div className="col s6" id="name">
            </div>
            <div className="col s3" id="set">
            </div>
          </div>
          <div className="row col s12" id="leftMid">

          </div>
          <div className="row col s12" id="leftBot">

          </div>
        </div>
        <div className="col s8" id="right">
          <div className="row col s12" id="rightTop">

          </div>
          <div className="row col s12" id="rightBot">

          </div>
        </div>
      </div>
    )
  }
}

export default Grid;
