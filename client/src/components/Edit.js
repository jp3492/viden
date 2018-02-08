import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAction, changeComment } from '../actions';

class Edit extends Component{
  selectTime(isStart){
    const start                     = document.getElementById("start");
    const stop                      = document.getElementById("stop");
    const { setAction, edit }       = this.props;
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
  render(){
    const { start, stop, comment, changeComment, _uid, _id } = this.props;
    if (_uid === _id) {
      return (
        <div className="col s12" id="editArea">
          <div className="col s2">
            <div className="col s12" id="start" onClick={ () => this.selectTime(true) }>  {start}     </div>
            <div className="col s12" id="stop"  onClick={ () => this.selectTime(false)}>  {stop}      </div>
          </div>
          <div className="col s9">
            <textarea value={comment} readOnly id="commentText" onChange={ e => changeComment(e.target.value) } className="col s12">
            </textarea>
          </div>
          <div className="col s1">
            <div>
              <button id="save" className="col s12 btn smallBtn" disabled>    Save    </button>
              <button id="delete" className="col s12 btn smallBtn" disabled>  Delete  </button>
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ auth: { _id }, highlights: { selectedHighlights: { _uid } }, controls: { start, stop, comment, edit }}) => {
  return { _id, _uid, start, stop, comment, edit }
}

export default connect(mapStateToProps, { changeComment, setAction })(Edit);
