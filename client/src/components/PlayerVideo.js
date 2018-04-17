import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { SET_PLAYER, PAUSE, PP, PROGRESS, SELECT_HIGHLIGHT, INITIATE } from '../actions/types';

class PlayerVideo extends Component{
  seeking(players, video, dispatch, start, stop, playList, count){
    const timer = setInterval( () => {
      const { filteredHighlights, player: { highlight, counter } } = this.props;
      let time;
      if (players[video].getCurrentTime() === null || count !== counter) {
        clearInterval(timer);
      } else {
        time = Number(players[video].getCurrentTime().toFixed(1));
      }
      if (Number(time) >= Number(stop)) {
        const { player: { edit, playing } } = this.props;
        if (edit === true) {
          if (playing === true) {
            dispatch({ type: PP });
          }
        } else {
          if (playList === true) {
            if (highlight+1 === filteredHighlights.length) {
              dispatch({ type: PP });
            } else {
              const next = filteredHighlights[highlight+1];
              if (highlight+1 > filteredHighlights.length) {
                dispatch({ type: PP });
                clearInterval(timer);
              } else {
                dispatch({ type: SELECT_HIGHLIGHT, payload: { video: next.video, highlight: highlight+1 } });
              }
            }
          } else {
            dispatch({ type: PP });
          }
        }
        clearInterval(timer);
      }}, 100);
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.player.counter !== this.props.player.counter) {
      const { dispatch, filteredHighlights, player: { highlight, players, video, playList, edit, counter }, site } = nextProps;
      if (filteredHighlights[highlight] === undefined) {
        return null;
      }
      const { start, stop } = filteredHighlights[highlight];
      players[video].seekTo(start);
      const seeking = setInterval( () => {
        let time;
        if (players[video].getCurrentTime() === null) {
          clearInterval(seeking);
        } else {
          time = Number(players[video].getCurrentTime().toFixed(1));
        }
        if (time === start) {
          clearInterval(seeking);
          this.seeking(players, video, dispatch, start, stop, playList, counter);
        }
      }, 100);
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if ((this.props.player.playing !== nextProps.player.playing) || (this.props.player.video !== nextProps.player.video) || (this.props.filteredHighlights !== nextProps.filteredHighlights)) { return true }
    return false;
  }
  setPlayer(i, p){
    const { dispatch, player: { players } } = this.props;
    if (players[i] === undefined || players[i] === null) {
      dispatch({ type: SET_PLAYER, payload: { i, p } });
    }
  }
  checkPlay(play){
    document.activeElement.blur();
    window.focus();
    const { dispatch, player: { playing } } = this.props;
    if ((play === true && playing === false) || (play === false && playing === true)) {
      dispatch({ type: PP });
    }
  }
  renderVideo(v, i){
    const { dispatch, player: { playing, video, initiated } } = this.props;
    const p = (initiated === true) ? ((video === i) ? playing: false): true;
    const className = (video === i) ? "player": "invisible player";
    return <ReactPlayer
            height='100%'
            width='100%'
            key={`player${i}`}
            url={v}
            playing={p}
            progressInterval={100}
            className={className}
            onProgress={ time => dispatch({ type: PROGRESS, payload: time })}
            onPlay={ () => this.checkPlay(true)}
            onPause={ () => this.checkPlay(false)}
            onStart={ () => dispatch({type: INITIATE, payload: i })}
            ref={ p => this.setPlayer(i, p) }/>;
  }
  render(){
    const { selectedProject, projects, site, selectedProjects } = this.props;
    if (site === "home") { return null }
    const project = projects.filter( p => { return p._id === selectedProject });
    const videos = (selectedProjects === false) ? project[0].videos: selectedProjects.videos;
    return(
      <div id="playerVideo">
        {videos.map( (v, i) => this.renderVideo(v, i))}
      </div>
    )
  }
}

const mapStateToProps = ({ main: { selectedProject, projects, filteredHighlights, site, selectedProjects }, player }) => {
  return { selectedProject, projects, player, filteredHighlights, site, selectedProjects };
}

export default withRouter(connect(mapStateToProps)(PlayerVideo));
