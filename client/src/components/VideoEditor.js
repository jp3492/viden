import React, { Component } from 'react';
import { connect } from 'react-redux';

import HighlightsList from './HighlightsList';
import Player from './Player';
import Controls from './Controls';
import Edit from './Edit';
import { changeSearch } from '../actions';


class VideoEditor extends Component{
  componentDidMount(){
    const win = window.innerHeight - 184;
    const sw = win - 17;
    document.getElementById("highlightsList").style.height = `${sw}px`;
    document.getElementById("cover").style.height = `${sw}px`;
    // window.addEventListener("keydown", e => alert(e), true);
  }
  render(){
    const { changeSearch } = this.props;
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
          <div className="row col s12" id="highlightsSearch">
            <input id="highSearch" className="col s10" placeholder="Filter..." onChange={ e => changeSearch(e.target.value)}/>
          </div>
          <div className="row col s12" id="highlightsList">
            <HighlightsList />
          </div>
          <div id="editorEdit">
            <Edit />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {changeSearch})(VideoEditor);
