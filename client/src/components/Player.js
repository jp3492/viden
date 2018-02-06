import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';

import { setTime, setAction, submitHighlight, changeComment, deleteHighlight, editHighlight, changeSearch } from '../actions';

class VideoPlayer extends Component {
  constructor (props) {
    super(props);
    this.state = { player: null };
    this._onReady = this._onReady.bind(this);
  }
  disableButtons(disable){
    document.getElementById("save").disabled = disable;
    document.getElementById("delete").disabled = disable;
  }
  componentWillReceiveProps(nextProps){
    const { _id, action, edit, start, stop, comment, searchKey, highlight, setTime, setAction, submitHighlight, changeComment, deleteHighlight, editHighlight, changeSearch } = nextProps;
    console.log(action, edit);
    if (action === null) { return; console.log("stopped"); }
    const commentText = document.getElementById("commentText");
    const { player } = this.state;
    let time = player.getCurrentTime();
    console.log(player.getCurrentTime());
    const state = player.getPlayerState();
    switch (action) {
      case "editStart":
        player.seekTo(start);
        player.pauseVideo();
        break;
      case "editStop":
        player.seekTo(stop);
        player.pauseVideo();
        break;
      case "save":
        editHighlight(_id, highlight.id, start, stop, comment, searchKey);
        changeSearch(searchKey);
        document.getElementById("start").classList.remove("editTime");
        document.getElementById("stop").classList.remove("editTime");
        commentText.readOnly = true;
        commentText.blur();
        document.getElementById("enter").disabled = false;
        this.disableButtons(true);
        break;
      case "delete":
        deleteHighlight(_id, highlight.id, searchKey);
        document.getElementById("start").classList.remove("editTime");
        document.getElementById("stop").classList.remove("editTime");
        commentText.readOnly = true;
        commentText.blur();
        document.getElementById("enter").disabled = false;
        this.disableButtons(true);
        break;
      case "edit":
        this.disableButtons(false);
        player.pauseVideo();
        document.getElementById("enter").disabled = true;
        document.getElementById("commentText").readOnly = false;
        document.getElementById("commentText").focus();
        break;
      case "play":
        if (state === 1) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
        break;
      case "left":
        time = Number(time) - 1;
        player.seekTo(time);
        if (edit === "editStart") {
          setTime("start", time.toFixed(2));
        } else if (edit === "editStop") {
          setTime("stop", time.toFixed(2));
        }
        break;
      case "right":
        time = Number(time) + 1;
        player.seekTo(time);
        if (edit === "editStart") {
          setTime("start", time.toFixed(2));
        } else if (edit === "editStop") {
          setTime("stop", time.toFixed(2));
        }
        break;
      case "jump":
        player.seekTo(start);
        player.playVideo();
        const timer = setInterval( () => {
          time = Number(player.getCurrentTime().toFixed(2));
          if (time === stop) {
            player.pauseVideo();
            clearInterval(timer);
          }
        }, 10);
        break;
      case "enter":
        document.getElementById("save").disabled = true;
        document.getElementById("delete").disabled = true;
        switch (edit) {
          case "start":
            player.playVideo();
            setTime("start", time.toFixed(2));
            changeComment("");
            commentText.readOnly = false;
            commentText.focus();
            break;
          case "stop":
            player.pauseVideo();
            setTime("stop", time.toFixed(2));
            commentText.focus();
            break;
          case "submit":
            player.playVideo();
            submitHighlight(_id, { start, stop, comment }, searchKey);
            document.getElementById("highlightsList").scrollTop = document.getElementById("highlightsList").scrollHeight;
            commentText.blur();
            commentText.readOnly = true;
            changeComment("");
            break;
          case "selected":
            setTime("start", "");
            setTime("stop", "");
            changeComment("");
            break;
        }
    }
    setAction(null);
    return;
  }
  shouldComponentUpdate(nextProps, nextState){
    return false;
  }
  render() {
    console.log( this.props);
    const { videoId } = this.props;
    const h = window.innerHeight - 160;
    const opts = {
      width: '100%',
      height: h,
      playerVars: {
        autoplay: 1,
        start: 0,
        controls: 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 0
      }
    };

    return (
        <div className="row fullHeight">
          <div id="cover"></div>
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={this._onReady}
          />
        </div>
    );
  }
  _onReady(event) {
    setTimeout( () => event.target.pauseVideo(), 500);
    this.setState({ player: event.target });
  }
}

const mapStateToProps = ({ controls: { action, edit, start, stop, comment, highlight, searchKey }, highlights: { selectedHighlights: { videoId, _id } } }) => {
  return{ start, stop, comment, action, edit, videoId, _id, highlight, searchKey }
}

export default connect(mapStateToProps, { setTime, setAction, submitHighlight, changeComment, deleteHighlight, editHighlight, changeSearch })(VideoPlayer);
