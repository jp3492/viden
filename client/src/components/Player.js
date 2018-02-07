import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';

import { setTime, setAction, submitHighlight, changeComment, deleteHighlight, editHighlight, changeSearch } from '../actions';

class VideoPlayer extends Component {
  constructor (props) {
    super(props);
    this.state    = { player: null, view: false };
    this._onReady = this._onReady.bind(this);
  }
  componentDidMount(){
    const { auth: { _id }, _uid } = this.props;
    const search                  =  document.getElementById("search");
    const searchResult            =  document.getElementById("searchResult");
    const editArea                =  document.getElementById("editArea");
    const enter                   =  document.getElementById("enter");

    if ( search !== null && searchResult !== null) {
      search.style.display        = "none";
      searchResult.style.display  = "none";
      if (_id !== _uid) {
        editArea.style.display    = "none";
        enter.style.display       = "none";
        const x                   = document.getElementsByClassName("editCell");
        for (let i = 0; i < x.length; i++) {
          x[i].style.display      = "none"
        }
      }
    }
  }
  disableButtons(disable){
    document.getElementById("save").disabled    = disable;
    document.getElementById("delete").disabled  = disable;
  }
  componentWillReceiveProps(nextProps){
    const { _id, action, edit, start, stop, comment, searchKey, highlight, setTime, setAction,
      submitHighlight, changeComment, deleteHighlight, editHighlight, changeSearch } = nextProps;
    const { player }              = this.state;
    let time                      = player.getCurrentTime();
    const state                   = player.getPlayerState();
    const commentText             = document.getElementById("commentText");
    const startBtn                = document.getElementById("start");
    const stopBtn                 = document.getElementById("stop");
    const enterBtn                = document.getElementById("enter");
    const highlightsList          = document.getElementById("highlightsList");
    const rates                   = player.getAvailablePlaybackRates();
    const rateIndex               = rates.indexOf(player.getPlaybackRate());

    switch (action) {
      case "mute":          if (player.isMuted()) { player.unMute() }
                            else {                  player.mute()   }
        break;
      case "slow":          player.setPlaybackRate(rates[rateIndex-1]);
        break;
      case "fast":          player.setPlaybackRate(rates[rateIndex+1]);
        break;
      case "editStart":     player.seekTo(start);
                            player.pauseVideo();
        break;
      case "editStop":      player.seekTo(stop);
                            player.pauseVideo();
        break;
      case "save":          editHighlight(_id, highlight.id, start, stop, comment, searchKey);
                            changeSearch(searchKey);
                            startBtn.classList.remove("editTime");
                            stopBtn.classList.remove("editTime");
                            commentText.readOnly    = true;
                            commentText.blur();
                            enterBtn.disabled       = false;
                            this.disableButtons(true);
        break;
      case "delete":        deleteHighlight(_id, highlight.id, searchKey);
                            startBtn.classList.remove("editTime");
                            stopBtn.classList.remove("editTime");
                            commentText.readOnly    = true;
                            commentText.blur();
                            enterBtn.disabled       = false;
                            this.disableButtons(true);
        break;
      case "edit":          this.disableButtons(false);
                            player.pauseVideo();
                            enterBtn.disabled       = true;
                            commentText.readOnly    = false;
                            commentText.focus();
        break;
      case "play":          if (state === 1) {                player.pauseVideo() }
                            else {                            player.playVideo()  }
        break;
      case "left":          time = Number(time) - 1;
                            player.seekTo(time);
                            if      (edit === "editStart") {  setTime("start", time.toFixed(2)) }
                            else if (edit === "editStop")  {  setTime("stop", time.toFixed(2))  }
        break;
      case "right":         time = Number(time) + 1;
                            player.seekTo(time);
                            if      (edit === "editStart") {  setTime("start", time.toFixed(2)) }
                            else if (edit === "editStop")  {  setTime("stop", time.toFixed(2))  }
        break;
      case "jump":          player.seekTo(start);
                            player.playVideo();
                            const timer = setInterval( () => {
                              time      = Number(player.getCurrentTime().toFixed(2));
                              if (time === stop) {            player.pauseVideo();
                                                              clearInterval(timer);
                              }}, 10);
        break;
      case "enter":         document.getElementById("save").disabled = true;
                            document.getElementById("delete").disabled = true;
                            switch (edit) {
                              case "start":                   player.playVideo();
                                                              setTime("start", time.toFixed(2));
                                                              changeComment("");
                                                              commentText.readOnly = false;
                                                              commentText.focus();
                                break;
                              case "stop":                    player.pauseVideo();
                                                              setTime("stop", time.toFixed(2));
                                                              commentText.focus();
                                break;
                              case "submit":                  player.playVideo();
                                                              submitHighlight(_id, { start, stop, comment }, searchKey);
                                                              highlightsList.scrollTop = highlightsList.scrollHeight;
                                                              commentText.blur();
                                                              commentText.readOnly = true;
                                                              changeComment("");
                                break;
                              case "selected":                setTime("start", "");
                                                              setTime("stop", "");
                                                              changeComment("");
                                break;
                            }
      break;
    }
    setAction(null);
    return;
  }
  shouldComponentUpdate(nextProps, nextState){ return false }

  render() {
    const { videoId }     = this.props;
    const h               = window.innerHeight - 160;
    const opts            = { width: '100%', height: h, playerVars: {
                              autoplay: 1, start: 0, controls: 0, rel: 0, showinfo: 0, modestbranding: 0 }};

    return (  <div className="row fullHeight"><div id="cover"></div>
                <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />
              </div>  );
  }
  _onReady(event) {
    setTimeout( () => event.target.pauseVideo(), 500);
    this.setState({ player: event.target });
  }
}

const mapStateToProps = ({ auth, controls: { action, edit, start, stop, comment, highlight, searchKey }, highlights: { selectedHighlights: { videoId, _id, _uid } } }) => {
  return{ auth, start, stop, comment, action, edit, videoId, _id, _uid, highlight, searchKey }
}

export default connect(mapStateToProps, { setTime, setAction, submitHighlight, changeComment, deleteHighlight, editHighlight, changeSearch })(VideoPlayer);
