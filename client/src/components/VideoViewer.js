import React, { Component } from 'react';
import { connect } from 'react-redux';

import HighlightsList from './HighlightsList';
import VideoPlayer from './VideoPlayer';
import Controls from './Controls';

class VideoViewer extends Component{

  render(){

    return(
      <div className="flexBox">
        <div className="row">
          <div className="col s8 fullHeight" id="vid">
            <VideoPlayer view />
          </div>
          <div className="col s4">
            <HighlightsList />
          </div>
        </div>
        <div className="row flexBoxBottom">
          <div className="col s12">
            <Controls view />
          </div>
        </div>
      </div>
    );
  }
}

export default VideoViewer;
