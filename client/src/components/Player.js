import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';

import { setTime, setAction, submitHighlight, changeComment, deleteHighlight, editHighlight, changeSearch, selectHighlight, navVideo, setVideo,
playerLoaded, refreshPlayer } from '../actions';

class VideoPlayer extends Component {
  constructor (props) {
    super(props);
    this.state    = { view: false };
    this._onReady = this._onReady.bind(this);
  }
  componentWillMount(){
    const { refreshPlayer, selectedHighlights: { videos } } = this.props;
    refreshPlayer(videos.length);
  }
  componentDidMount(){
    const { auth: { _id }, selectedHighlights: { _uid }, setVideo } = this.props;
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
    document.getElementById("v0").style.display = "block";
  }
  disableButtons(disable){
    document.getElementById("save").disabled    = disable;
    document.getElementById("delete").disabled  = disable;
  }
  componentWillReceiveProps(nextProps){
    const { selectedHighlights: { _id, videos }, action, edit, start, stop, comment, searchKey, highlight, setTime, setAction,
      submitHighlight, changeComment, deleteHighlight, editHighlight, changeSearch, selectHighlight, video, navVideo, setVideo,
      load } = nextProps;
    if (load.player === 0) { document.getElementById("loadVideo").style.display = "none" }
    console.log(video);
    document.getElementById(`v${this.props.video}`).style.display = "none";
    document.getElementById(`v${video}`).style.display = "block";
    if (videos[this.props.video] !== videos[video]) {
      this.state[`v${this.props.video}`].pauseVideo();
    }
    const vidNum = `v${video}`;
    const player = this.state[vidNum];
    if (player === null || player === undefined) { return }
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
      case "backv":         navVideo(false, videos.length);
        break;
      case "nextv":         navVideo(true, videos.length);
        break;
      case "up":            if (highlight.number !== 0) {
                              const lastIndex = highlight.number - 1;
                              let v = 0;
                              videos.map( (v, i) => { if (v.videoId === this.props.selectedHighlights.highlights[lastIndex].videoId) {
                                v = i;
                              }});
                              selectHighlight(this.props.selectedHighlights.highlights[lastIndex], lastIndex, v );
                            }
                            return;
      case "down":          if (highlight.number !== this.props.selectedHighlights.highlights.length - 1) {
                              const nextIndex = highlight.number + 1;
                              let vi = 0;
                              videos.map( (v, i) => { if (v.videoId === this.props.selectedHighlights.highlights[nextIndex].videoId) {
                                vi = i;
                              }});
                              selectHighlight(this.props.selectedHighlights.highlights[nextIndex], nextIndex, vi );
                            }
                            return;
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
      case "save":          editHighlight(_id, highlight.id, start, stop, comment, highlight.videoId, searchKey);
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
      case "jump":          this.state[`v${this.props.video}`].pauseVideo();
                            let rows = document.getElementsByTagName("tr");
                            for (var i = 0; i < rows.length; i++) { rows[i].classList.remove("selected") }
                            document.getElementById(highlight.id).classList.add("selected");
                            player.seekTo(start);
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
                                                              submitHighlight(_id, { start, stop, comment, videoId: videos[video].videoId }, searchKey);
                                                              highlightsList.scrollTop = highlightsList.scrollHeight;
                                                              commentText.blur();
                                                              commentText.readOnly = true;
                                                              changeComment("");
                                break;
                              case "selected":                setTime("start", "");
                                                              setTime("stop", "");
                                                              changeComment("");
                                break;
                              default:
                                break;
                            }
        break;
      default:
        break;
    }
    setAction(null);
    return;
  }
  shouldComponentUpdate(nextProps, nextState){ return false }
  renderVideo(video, i, opts){
    const v = `v${i}`;
    return (
      <div id={v} key={v} className="videoBox">
        <YouTube videoId={video.videoId} opts={opts} onReady={ event => this._onReady(event, v) } />
      </div>
    )
  }
  render() {
    const { selectedHighlights: { videos } }      = this.props;
    const h                                       = window.innerHeight - 160;
    const opts                                    = { width: '100%', height: h, playerVars: { autoplay: 1, start: 0, controls: 0, rel: 0, showinfo: 0, modestbranding: 0 } };
    return (
      <div>
        <div id="loadVideo" className="valign-wrapper">
          <div>
            <div className="center-align preloader-wrapper small active"><div className="spinner-layer spinner-green-only"><div className="circle-clipper left">
            <div className="circle"></div></div><div className="gap-patch"><div className="circle"></div></div><div className="circle-clipper right">
            <div className="circle"></div></div></div></div>
          </div>
        </div>
        <div id="cover"></div>
        {videos.map( (v, i) => this.renderVideo(v, i, opts))}
      </div>
    );
  }
  _onReady(event, v) {
    // loop over videos, play till sec 1, then back to zeor and remove loading screen
    this.setState({ [v]: event.target });
    const timer   = setInterval( () => {
      const time  = Number(this.state[v].getCurrentTime().toFixed(2));
      if (time !== 0) {             this.state[v].pauseVideo();
                                    this.state[v].seekTo(0);
                                    this.props.playerLoaded();
                                    clearInterval(timer);
      }}, 10);

  }
}

const mapStateToProps = ({ load, auth, controls: { action, edit, start, stop, comment, highlight, searchKey, video }, highlights: { selectedHighlights } }) => {
  return{ load, auth, start, stop, comment, action, edit, selectedHighlights, highlight, searchKey, video }
}

export default connect(mapStateToProps, { setTime, setAction, submitHighlight, changeComment, deleteHighlight,
  editHighlight, changeSearch, selectHighlight, navVideo, setVideo, playerLoaded, refreshPlayer })(VideoPlayer);
