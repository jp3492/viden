import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerCopy extends Component{

  render(){

    return(
      <div id="playerCopy">
        PlayerCopy
      </div>
    );
  }
}
const mapStateToProps = ({ player: { copy } }) => {
  return { copy }
}
export default connect(mapStateToProps)(PlayerCopy);
