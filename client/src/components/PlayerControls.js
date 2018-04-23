import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import $ from 'jquery';

import { submitHighlight, updateHighlight } from '../actions';
import { PP, CV, MARK, HP, HN, PLAY_LIST } from '../actions/types';

class PlayerControls extends Component{
  componentDidMount(){
    document.addEventListener('keydown', e => this.keyPress(e) );
  }
  keyPress(e){
    const { dispatch } = this.props;
    if ($('#modalCopy')[0] === undefined || $('#modalCopy')[0].M_Modal.isOpen !== true) {
      if (e.keyCode === 37 && e.ctrlKey) { this.nextVideo(false) }
      else if (e.keyCode === 39 && e.ctrlKey) { this.nextVideo(true) }
      else if (e.keyCode === 32 && e.ctrlKey) { dispatch({ type: PP }) }
      switch (e.keyCode) {
        case 38: this.nextHighlight(false); break;
        case 40: this.nextHighlight(true); break;
        case 37: this.forward(false); break;
        case 39: this.forward(true); break;
        case 13: e.preventDefault(); this.mark(); break;
        default: console.log("invalid key command"); break;
      }
    };
    if (document.getElementById('codeInput') !== null && document.activeElement !== document.getElementById('playerFilterSearch')) {
      document.getElementById('codeInput').focus()
    }
  }
  mark() {
    const { dispatch, player: { start, stop, players, video, comment, edit, highlight }, action: { submitHighlight, updateHighlight }, selectedProject, filteredHighlights } = this.props;
    const highlights = _.sortBy(filteredHighlights, "start");
    const selectedHighlight = (highlights[highlight] !== undefined && highlights.length !== 0) ? highlights[highlight]._id: null;
    const act = (edit === true) ? 1: (start === null) ? 2: (stop === null) ? 3: 4;
    switch (act) {
      case 1: updateHighlight(selectedProject, selectedHighlight, start, stop, comment); break;
      case 2: dispatch({ type: MARK, payload: { what: "start", time: players[video].getCurrentTime() }}); break;
      case 3: dispatch({ type: MARK, payload: { what: "stop",time: players[video].getCurrentTime() }}); break;
      case 4: submitHighlight(selectedProject, video, start, stop, comment); break;
      default: console.log("unvalid mark"); break;
    }
  }
  renderMark(admin){
    if (admin === false) { return null }
    const { player: { edit, start, stop } } = this.props;
    const butt = (edit === true) ? "Save": (start === null) ? "Start": (stop === null) ? "Stop": "Submit";
    return <a className="btn controlBtn" onClick={() => this.mark()}>{butt}</a>;
  }
  jumpProgress(e){
    const { player: { video, players } } = this.props;
    const progress = ((e.clientX * 100)/document.getElementById('progress').offsetWidth) / 100;
    players[video].seekTo(progress);
  }
  forward(f){
    const { player: { players, video, playing } } = this.props;
    const current = players[video].getCurrentTime();
    const time = (playing === true) ? 1: 0.1;
    const to = (f === true) ? current + time: (current !== 0) ? current - time: 0;
    players[video].seekTo(to);
  }
  nextVideo(next){
    const { dispatch, player: { video }, selectedProjects, selectedProject, filteredProjects } = this.props;
    const project = (selectedProjects === false) ? filteredProjects.filter( p => { return p._id === selectedProject }): (selectedProjects.projects.length === 1) ? filteredProjects.filter( p => { return p._id === selectedProjects.projects[0] }): null;
    const videos = (selectedProjects === false) ? project[0].videos.length - 1: selectedProjects.videos.length - 1;
    const vid = (next === true) ? (video === videos) ? 0: video + 1: (video === 0) ? videos: video - 1;
    dispatch({ type: CV, payload: vid })
  }
  nextHighlight(next){
    const { dispatch, filteredHighlights, player: { highlight } } = this.props;
    const add = (next === true) ? -10: 10;
    document.getElementById('playerList').scrollTop = document.getElementById(`highlight${highlight}`).offsetTop + add;
    const highlights = _.sortBy(filteredHighlights, "start");
    const nextIndex = (next === true) ? (highlight === (filteredHighlights.length - 1)) ? 0: highlight + 1: (highlight === 0) ? filteredHighlights.length - 1: highlight - 1;
    const nextHighlight = highlights[nextIndex];
    const type = (next === true) ? HN: HP;
    dispatch({ type, payload: { v: nextHighlight.video, h: nextIndex } });
  }
  render(){
    const { dispatch, auth, player: { progress, playList, playing }, selectedProjects, filteredProjects, selectedProject } = this.props;
    if (selectedProject === null) {
      return null;
    }
    const project = (selectedProjects === false) ? filteredProjects.filter( p => { return p._id === selectedProject }): (selectedProjects.projects.length === 1) ? filteredProjects.filter( p => { return p._id === selectedProjects.projects[0] }): null;
    const admin = (project === null) ? false: (project[0]._uid === auth._id) ? true: false;
    const playingList = (playList === true) ? "material-icons playList center-align": "material-icons center-align";
    const play = (playing === false) ? "Play": "Pause";
    return(
      <div id="playerControls">
        <div id="progress" onClick={ (e) => this.jumpProgress(e)} className="progress">
          <div onClick={ (e) => this.jumpProgress(e)} className="determinate" style={{width: `${progress}%`}}>
          </div>
        </div>
        <div id="controlButtons">
          <a className="btn controlBtn" onClick={ () => dispatch({ type: PP })}>{play}</a>
          <a className="btn controlBtn">Slow</a>
          <a className="btn controlBtn">Fast</a>
          <a className="btn controlBtn" onClick={ () => this.forward(false) }>Back</a>
          <a className="btn controlBtn" onClick={ () => this.forward(true) }>Forw</a>
          <a className="btn controlBtn" onClick={ () => this.nextVideo(false) }>PV</a>
          <a className="btn controlBtn" onClick={ () => this.nextVideo(true) }>NV</a>
          <a className="btn controlBtn" onClick={ () => this.nextHighlight(false)}>PH</a>
          <a className="btn controlBtn" onClick={ () => this.nextHighlight(true)}>NH</a>
          {this.renderMark(admin)}
          <a id="playList" className="valign-wrapper center-align" onClick={ () => dispatch({ type: PLAY_LIST })}><i className={playingList}>list</i></a>
        </div>
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
