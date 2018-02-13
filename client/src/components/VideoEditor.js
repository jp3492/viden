import React, { Component } from 'react';

import HighlightsList from './HighlightsList';
import Player from './Player';
import Controls from './Controls';
import Edit from './Edit';

class VideoEditor extends Component{
  componentDidMount(){
    const win = window.innerHeight - 160;
    document.getElementById("highlightsList").style.height = `${win}px`;
    document.getElementById("cover").style.height = `${win}px`;
  }
  render(){
    return(
      <div className="row">
        <div className="col s8 editorLeft">
          <div id="editorPlayer">
            <Player />
          </div>
          <div id="editorControls">
            <Controls />
          </div>
        </div>
        <div className="col s4 editorRight">
          <div id="highlightsList">
            <HighlightsList />
          </div>
          <div className="editorEdit">
            <Edit />
          </div>
        </div>
      </div>
    );
  }
}

export default VideoEditor;
