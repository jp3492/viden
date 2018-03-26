import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { submitHighlight, updateHighlight } from '../actions';
import { PP, CV, MARK, SUBMIT_HIGHLIGHT, HP, HN, SAVE, PLAY_LIST } from '../actions/types';

class PlayerControls extends Component{
  renderMark(admin){
    if (admin === false) {
      return null;
    }
    const { dispatch, player: { playing, start, stop, players, video, comment, edit, highlight }, action: { submitHighlight, updateHighlight }, selectedProject, filteredHighlights } = this.props;
    const selectedHighlight = (filteredHighlights.length !== 0) ? filteredHighlights[highlight]._id: null;
    if (edit === true) {
      return <button className="btn" onClick={ () => updateHighlight(selectedProject, selectedHighlight, start, stop, comment)}>Save</button>
    }
    if (start === null) {
      return <button className="btn" onClick={ () => dispatch({ type: MARK, payload: { what: "start", time: players[video].getCurrentTime() }})}>Start</button>
    } else if (stop === null) {
      return <button className="btn" onClick={ () => dispatch({ type: MARK, payload: { what: "stop",time: players[video].getCurrentTime() }})}>Stop</button>
    }
    return <button className="btn" onClick={ () => submitHighlight(selectedProject, video, start, stop, comment) }>Submit</button>
  }
  jumpProgress(e){
    const { player: { video, players } } = this.props;
    const progress = ((e.clientX * 100)/document.getElementById('progress').offsetWidth) / 100;
    players[video].seekTo(progress);
  }
  forward(f){
    const { player: { players, video } } = this.props;
    const current = players[video].getCurrentTime();
    const to = (f === true) ? current + 1: (current !== 0) ? current - 1: 0;
    players[video].seekTo(to);
  }
  render(){
    const { dispatch, auth, player: { video, players, highlight, progress, playList, playing }, filteredProjects, projects, selectedProject, filteredHighlights, selectedProjects } = this.props;
    const project = (selectedProjects === false) ? filteredProjects.filter( p => { return p._id === selectedProject }): (selectedProjects.projects.length === 1) ? filteredProjects.filter( p => { return p._id === selectedProjects.projects[0] }): null;
    const admin = (project === null) ? false: (project[0]._uid === auth._id) ? true: false;
    const videos = (selectedProjects === false) ? project[0].videos.length - 1: selectedProjects.videos.length - 1;
    const nextVideo = (video === videos) ? 0: video + 1;
    const prevVideo = (video === 0) ? videos: video - 1;
    const highlights = _.sortBy(filteredHighlights, "start");
    const nextIndex = (highlight === (filteredHighlights.length - 1)) ? 0: highlight + 1;
    const prevIndex = (highlight === 0) ? filteredHighlights.length - 1: highlight - 1;
    const nextHighlight = highlights[nextIndex];
    const prevHighlight = highlights[prevIndex];
    const playingList = (playList === true) ? "material-icons playList": "material-icons";
    const play = (playing === false) ? "Play": "Pause";
    return(
      <div id="playerControls" className="row">
        <div
          id="progress"
            onClick={ (e) => this.jumpProgress(e)}
            className="progress">
          <div
            onClick={ (e) => this.jumpProgress(e)}
            className="determinate" style={{width: `${progress}%`}}></div>
        </div>
        <a id="playList" className="btn" onClick={ () => dispatch({ type: PLAY_LIST })}><i className={playingList}>list</i></a>
        <a className="btn" onClick={ () => dispatch({ type: PP })}>{play}</a>
        <a className="btn" onClick={ () => this.forward(false) }>Back</a>
        <a className="btn" onClick={ () => this.forward(true) }>Forw</a>
        <a className="btn" onClick={ () => dispatch({ type: CV, payload: nextVideo })}>PV</a>
        <a className="btn" onClick={ () => dispatch({ type: CV, payload: prevVideo })}>NV</a>
        <a className="btn" onClick={ () => dispatch({ type: HP, payload: { v: prevHighlight.video, h: prevIndex } })}>PH</a>
        <a className="btn" onClick={ () => dispatch({ type: HN, payload: { v: nextHighlight.video, h: nextIndex } })}>NH</a>
        {this.renderMark(admin)}
      </div>
    )
  }
}

const mapStateToProps = ({ auth, player, main: { projects, selectedProject, filteredHighlights, selectedProjects, filteredProjects } }) => {
  return { auth, player, projects, selectedProject, filteredHighlights, selectedProjects, filteredProjects };
}

const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ submitHighlight, updateHighlight }, dispatch), dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
