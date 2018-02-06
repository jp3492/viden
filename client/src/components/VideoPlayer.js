import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';

import { jumpTo, setAction, changePlay, setState, setTime, submitHighlight } from '../actions';
let currentTime = 0;

class VideoPlayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      player: null,
    };
    this._onReady = this._onReady.bind(this);
  }
  componentDidMount(){
    document.addEventListener("keydown", (e) => { this.onKeyPress(e) });
    if (this.props.view) {
      this.playList();
    }
    currentTime = 0;
  }
  playList(){
  }
  onKeyPress(e){
    const { changePlay, controls: { paused } } = this.props;
    if (document.getElementById("commentText").readOnly === true) {
      switch (e.keyCode) {
        case 32:
          changePlay();
          e.preventDefault();
          const state = this.state.player.getPlayerState();
          if (state === 2 || state === 5 ) {
            this.state.player.playVideo();
          } else if (state === 1) {
            this.state.player.pauseVideo();
          }
          break;
        case 13:
          if (!this.props.view) {
            this.executeAction("enter");
          }
          break;
        case 39:
          this.executeAction("right");
          break;
        case 37:
          this.executeAction("left");
          break;
        case 38:
          alert("back highlight");
          break;
        case 40:
          alert("next highlight");
          break;
      }
    } else {
      if (e.keyCode === 13) {
        this.executeAction("enter");
      }
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    const { controls: { start, stop, action } } = nextProps;
    if (start !== null) {
      this.jumpTo(start, stop);
    }
    if (action !== "edit") {
      this.executeAction(action);
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    return false;
  }
  executeAction(action){
    const { submitHighlight, setTime, setState, setAction, changePlay, controls, videoId, _id, edit } = this.props;
    currentTime = this.state.player.getCurrentTime();
    switch (action) {
      case "play":
        if (controls.paused === true) {
          this.state.player.playVideo();
          changePlay(false);
        } else {
          this.state.player.pauseVideo();
          changePlay(true);
        }
        break;
      case "left":
        this.state.player.seekTo(currentTime - 1);
        break;
      case "right":
        this.state.player.seekTo(currentTime + 1);
        break;
      case "enter":
        switch (controls.edit) {
          case null:
            setTime("start", currentTime.toFixed(2), "-- paused: ", controls.paused);
            this.state.player.playVideo();
            break;
          case "start":
            setTime("stop", currentTime.toFixed(2), "-- paused: ", controls.paused);
            this.state.player.pauseVideo();
            document.getElementById("commentText").readOnly = false;
            document.getElementById("commentText").focus();
            break;
          case "stop":
            submitHighlight(_id, edit)
            setTime("start", null);
            setTime("stop", null);
            this.state.player.playVideo();
            document.getElementById("commentText").value = "";
            document.getElementById("commentText").blur();
            document.getElementById("commentText").readOnly = true;
            break;
        }
        setState();
        break;
      case null:
        return;
    }
    setAction(null);
  }
  jumpTo(start, stop){
    this.state.player.seekTo(start);
    this.props.jumpTo(null, null);
    this.state.player.playVideo();
    var timer = setInterval( () => {
      const currentTime = Number((this.state.player.getCurrentTime()).toFixed(2));
      if (currentTime === stop) {
        this.state.player.pauseVideo();
        clearInterval(timer);
      }
    }, 10);
  }

  render() {
    const { videoId } = this.props;
    const h = window.innerHeight - 160;
    const opts = {
      width: '100%',
      height: h,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        start: 0,
        controls: 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 0
      }
    };

    return (
        <div className="row fullHeight">
          <YouTube
            id="videoP"
            videoId={videoId}
            opts={opts}
            onReady={this._onReady}
            enablejsapi
          />
        </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    this.setState({
      player: event.target,
    });
  }
}

const mapStateToProps = ({ edit, controls, highlights: { selectedHighlights: { videoId, _id, highlights } } }) => {
  return{
    highlights,
    edit,
    controls,
    videoId,
    _id
  }
}

export default connect(mapStateToProps, { jumpTo, setAction, changePlay, setState, setTime, submitHighlight })(VideoPlayer);
