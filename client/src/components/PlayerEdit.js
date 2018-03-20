import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteHighlight } from '../actions';
import { CHANGE_COMMENT, CHANGE_TIME } from '../actions/types';

class PlayerEdit extends Component{
  renderEdit(high, selectedProject){
    const { edit, action: { deleteHighlight } } = this.props;
    if (edit) {
      return <a href="#" onClick={ () => deleteHighlight(selectedProject, high._id)}>Delete</a>;
    }
    return "DbClick->Edit"
  }
  render(){
    const { dispatch, comment, start, stop, filteredHighlights, highlight, selectedProject, copy } = this.props;
    const high = filteredHighlights[highlight];
    if (copy !== false) {
      return (
        <div id="playerCopy" className="col 12 row">
          <button className="btn col s12">Save</button>
        </div>
      );
    }
    return(
      <div id="playerEdit" className="col 12">
        <div className="row">
          <div className="col s4" onClick={ () => dispatch({ type: CHANGE_TIME, payload: "start" })}>
            {`Start: ${start}`}
          </div>
          <div className="col s4" onClick={ () => dispatch({ type: CHANGE_TIME, payload: "stop" })}>
            {`Stop: ${stop}`}
          </div>
          <div className="col s4">
            {this.renderEdit(high, selectedProject)}
          </div>
        </div>
        <textarea value={comment} className="col s12 materialize-textarea" onChange={ e => dispatch({ type: CHANGE_COMMENT, payload: e.target.value })}>
        </textarea>
      </div>
    )
  }
}

const mapStateToProps = ({ player: { start, stop, comment, highlight, edit, copy }, main: { filteredHighlights, selectedProject } }) => {
  return { start, stop, comment, highlight, filteredHighlights, selectedProject, edit, copy };
}

const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ deleteHighlight }, dispatch), dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerEdit);
