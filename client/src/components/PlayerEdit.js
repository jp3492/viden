import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import _ from 'lodash';

import { deleteHighlight, copyCreate, deleteHighlights } from '../actions';
import { CHANGE_COMMENT, CHANGE_TIME } from '../actions/types';

import CreateProject from './CreateProject';
import CreateCopySubmit from './CreateCopySubmit';

class PlayerEdit extends Component{
  renderEdit(high, selectedProject){
    const { edit, action: { deleteHighlight } } = this.props;
    if (edit) {
      return <a href="#" onClick={ () => deleteHighlight(selectedProject, high._id)}>Delete</a>;
    }
    return "DbClick->Edit"
  }
  render(){
    const { auth, dispatch, comment, start, stop, filteredHighlights, highlight, selectedProject, copy, filteredProjects, selectedProjects,
      action: { copyCreate, deleteHighlights } } = this.props;
    const project = (selectedProjects === false) ? filteredProjects.filter( p => { return p._id === selectedProject }): (selectedProjects.projects.length === 1) ? filteredProjects.filter( p => { return p._id === selectedProjects.projects[0] }): null;
    const admin = (project === null) ? false: (project[0]._uid === auth._id) ? true: false;
    const highlights = _.sortBy(filteredHighlights, "start");
    const high = highlights[highlight];
    const del = (selectedProjects === false && admin === true) ? <a onClick={ () => deleteHighlights(copy.highlights, selectedProject) } className="btn red col s6">Delete</a>: null;
    $(document).ready(function(){
      $('.modal').modal();
    });
    if (copy !== false && copy.highlights.length !== 0) {
      return (
        <div id="playerCopy" className="col s12 row">
          <a onClick={ () => copyCreate(copy, selectedProject) } className="btn col s6  modal-trigger" href="#modalCopy">Save</a>
          {del}
          <div id="modalCopy" className="modal">
            <CreateProject copy={true}/>
            <CreateCopySubmit />
          </div>
        </div>
      );
    }
    if (admin === false || start === null) {
      return null;
    }
    return(
      <div id="playerEdit" className="col 12 row">
        <textarea id="codeInput" value={comment} placeholder="Code..." className="col s12 materialize-textarea" onChange={ e => dispatch({ type: CHANGE_COMMENT, payload: e.target.value })}>
        </textarea>
        <div className="col s12" id="times">
          <div className="col s4 center-align" onClick={ () => dispatch({ type: CHANGE_TIME, payload: "start" })}>
            {`Start: ${start}`}
          </div>
          <div className="col s4 center-align" onClick={ () => dispatch({ type: CHANGE_TIME, payload: "stop" })}>
            {`Stop: ${stop}`}
          </div>
          <div className="col s4 center-align">
            {this.renderEdit(high, selectedProject)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, player: { start, stop, comment, highlight, edit, copy }, main: { filteredHighlights, selectedProject, filteredProjects, selectedProjects } }) => {
  return { auth, start, stop, comment, highlight, filteredHighlights, selectedProject, edit, copy, filteredProjects, selectedProjects };
}

const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ deleteHighlight, copyCreate, deleteHighlights }, dispatch), dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerEdit);
