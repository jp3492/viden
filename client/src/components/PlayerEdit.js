import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import _ from 'lodash';

import { deleteHighlight, copyCreate, deleteHighlights } from '../actions';
import { CHANGE_COMMENT, CHANGE_TIME, DISSMISS_HIGHLIGHT } from '../actions/types';

import CreateProject from './CreateProject';
import CreateCopySubmit from './CreateCopySubmit';
import ProjectList from './ProjectList';

class PlayerEdit extends Component{
  shouldComponentUpdate(nextProps, nextState){
    if ((this.props.copy !== false && nextProps.copy === false) || (this.props.copy !== false && this.props.copy.highlights.length !== nextProps.copy.highlights.length)) {
      return true;
    }
    if (this.props.start !== nextProps.start || this.props.stop !== nextProps.stop || this.props.comment !== nextProps.comment) {
      return true;
    }
    if ((nextProps.copy !== false && nextProps.copy.highlights.length === 1) || nextProps.copy === false || nextProps.copy.highlights.length === 0) {
      if (this.props.copy.folder !== nextProps.copy.folder || (this.props.copy.folder === nextProps.copy.folder && nextProps.copy.folder !== null) || this.props.copy.targets !== nextProps.copy.targets) {
        return false;
      }
      return true
    } else {
      return false
    }
  }
  renderEdit(high, selectedProject){
    const { edit, action: { deleteHighlight }, dispatch } = this.props;
    if (edit) {
      return <a href="#" className="btn red" onClick={ () => deleteHighlight(selectedProject, high._id, high.index)}>Delete</a>;
    }
    return <a href="#" className="btn red" onClick={ () => dispatch({ type: DISSMISS_HIGHLIGHT })}>Dismiss</a>;
  }
  render(){
    const { auth, dispatch, comment, start, stop, filteredHighlights, highlight, selectedProject, copy, filteredProjects, selectedProjects,
      action: { copyCreate, deleteHighlights } } = this.props;
    const project = (selectedProjects === false) ? filteredProjects.filter( p => { return p._id === selectedProject }): (selectedProjects.projects.length === 1) ? filteredProjects.filter( p => { return p._id === selectedProjects.projects[0] }): null;
    const admin = (project === null) ? false: (project[0]._uid === auth._id) ? true: false;
    const highlights = _.sortBy(filteredHighlights, "start");
    const high = highlights[highlight];
    const del = (selectedProjects === false && admin === true) ?
      <a onClick={ () => deleteHighlights(copy.highlights, selectedProject) } className="btn red col s4">Delete</a>: null;
    $(document).ready(function(){
      $('.modal').modal();
      $('#modalAdd').modal({ dismissible: true});
    });

    if (copy !== false && copy.highlights.length !== 0) {
      return (
        <div id="playerCopy" className="col s12 row">
          <a onClick={ () => copyCreate(copy, selectedProject) } className="btn col s4  modal-trigger" href="#modalCopy">Save</a>
          <a  className="btn col s4  modal-trigger" href="#modalAdd">Add to</a>
          {del}
          <div id="modalCopy" className="modal">
            <CreateProject copy={true}/>
            <CreateCopySubmit />
          </div>
          <div id="modalAdd" className="modal">
            <ProjectList />
          </div>
        </div>
      );
    }
    if (admin === false || (start === null && comment === "")) {
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
