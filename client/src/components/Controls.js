import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeComment, setAction } from '../actions';

class Controls extends Component{
  componentDidMount(){
    const { setAction }                     = this.props;
    const save                              = document.getElementById("save");
    const del                               = document.getElementById("delete")
    if (save !== null && del !== null) {
      save.addEventListener("click", () => {      setAction("save")   });
      del.addEventListener("click", () => {       setAction("delete") });
    }
  }
  renderEnter(setAction){
    const { auth, selectedHighlights }      = this.props;
    if (auth._id === selectedHighlights._uid) {
      return <button className="btn col s2 controlsBtn" id="enter" onClick={ () => setAction("enter") }> Mark </button> }
  }
  renderEdit(){
    const { auth, selectedHighlights }      = this.props;
    if (auth._id === selectedHighlights._uid) {
      return (
        <div>
          <button id="save" className="col s12 btn smallBtn" disabled>    Save    </button>
          <button id="delete" className="col s12 btn smallBtn" disabled>  Delete  </button>
        </div>
      )
    }
  }
  selectTime(isStart){
    const start                             = document.getElementById("start");
    const stop                              = document.getElementById("stop");
    const { setAction, controls: { edit } } = this.props;
    if (edit === "selected" || edit === "editStart" || edit === "editStop") {
      if (isStart) {        start.classList.toggle("editTime");
                            stop.classList.remove("editTime");
                            if (start.classList.contains("editTime")) { setAction("editStart") }
                            else                                      { setAction(null)        } }
      else {                stop.classList.toggle("editTime");
                            start.classList.remove("editTime");
                            if (stop.classList.contains("editTime"))  { setAction("editStop")  }
                            else                                      { setAction(null)        } } }
  }
  render() {
    const { changeComment, setAction, controls: { comment, start, stop } } = this.props;
    return(
      <div id="controls" className="row bottomFixed">
        <div className="col s8">
          <div className="btn col s2 controlsBtn" onClick={ () => setAction("play") } >   Play/Pause  </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("left") } >   Rewind      </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("right") }>   Forward     </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("slow") } >   Slow        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("fast") } >   Fast        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("mute") } >   Mute        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("jump") } >   Jump        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("up" ) }  >   Back        </div>
          <div className="btn col s1 controlsBtn" onClick={ () => setAction("down") } >   Next        </div>
          {this.renderEnter(setAction)}
        </div>
        <div className="col s4" id="editArea">
          <div className="col s2">
            <div className="col s12" id="start" onClick={ () => this.selectTime(true) }>  {start}     </div>
            <div className="col s12" id="stop"  onClick={ () => this.selectTime(false)}>  {stop}      </div>
          </div>
          <div className="col s9">
            <textarea value={comment} readOnly id="commentText" onChange={ e => changeComment(e.target.value) } className="col s12">
            </textarea>
          </div>
          <div className="col s1">
            {this.renderEdit()}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, controls, highlights: { selectedHighlights } }) => {
  return { auth, controls, selectedHighlights }
}

export default connect(mapStateToProps, { changeComment, setAction })(Controls);
