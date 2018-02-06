import React, { Component } from 'react';
import { connect } from 'react-redux';

import HighlightsList from './HighlightsList';
import Player from './Player';
import Controls from './Controls';

class VideoEditor extends Component{
  componentWillMount(){
    if (this.props.selectedHighlights === null) {
      this.props.history.push('/');
    }
  }
  componentDidMount(){
    const win = window.innerHeight - 160;
    document.getElementById("highlightsList").style.height = `${win}px`;
    document.getElementById("cover").style.height = `${win}px`;
  }
  render(){
    return(
      <div className="flexBox">
        <div className="row fullHeight" id="topRow">
          <div className="col s8 fullHeight" id="vid">
            <Player />
          </div>
          <div className="col s4" id="highlightsList">
            <HighlightsList />
          </div>
        </div>
        <div className="row flexBoxBottom">
          <div className="col s12">
            <Controls />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ highlights: { selectedHighlights } }) => {
  return{
    selectedHighlights
  }
}

export default connect(mapStateToProps)(VideoEditor);
