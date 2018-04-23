import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import { create_update, removeObj } from '../actions';
import { CREATE } from '../actions/types';

import CreateProject from './CreateProject';
import CreateFolder from './CreateFolder';
import CreateGroup from './CreateGroup';
import UpdateUser from './UpdateUser';
import CreateVolley from './CreateVolley';

class Create extends Component{
  componentDidMount(){
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
    $(document).ready(function(){
      $('.modal').modal();
    });
  }
  submitCreate(update){
    const { action, create, auth, create: { invites } } = this.props;
    action.create_update(update, create, auth._id, invites);
    $('.modal').modal('close');
  }
  deleteObj(){
    const { action, create, auth } = this.props;
    if (create.type === "project") {
      action.removeObj({ _id: create._id, type: create.type, _uid: create._uid }, auth._id);
    } else {
      action.removeObj({ _id: create._id, type: create.type }, auth._id);
    }
    $('.modal').modal('close');
  }
  render(){
    const { dispatch, create, update } = this.props;
    const createWhat = (create === null) ? null: (create.type === "dataVolley") ? <CreateVolley />: (create.type === "project") ? <CreateProject />: (create.type === "folder") ? <CreateFolder />: (create.type === "group") ? <CreateGroup />: <UpdateUser />;
    const del = (update === true) ?
      <a onClick={ () => this.deleteObj() }
        id="delete_btn" className="left btn waves-effect waves-green">Delete</a>: null;
    const create_update = (update === true) ?
      <a onClick={ () => this.submitCreate(true) } id="create_btn" ref="#" className="btn waves-effect waves-green">Update</a>:
      <a onClick={ () => this.submitCreate(false) } id="create_btn" ref="#" className="btn waves-effect waves-green">Create</a>
    return(
      <div className="col s6" id="bodyCreate">
        <a  materialize="dropdown" className='dropdown-button btn folderBtn col s12'  data-activates="createOptions">New</a>
        <ul id="createOptions" className='dropdown-content'>
          <li onClick={ () => dispatch({ type: CREATE, payload: "project" }) }><a  className="modal-trigger" href="#modal1">Project</a></li>
          <li onClick={ () => dispatch({ type: CREATE, payload: "folder" }) }><a  className="modal-trigger" href="#modal1">Folder</a></li>
          <li onClick={ () => dispatch({ type: CREATE, payload: "group" }) }><a  className="modal-trigger" href="#modal1">Group</a></li>
          <li onClick={ () => dispatch({ type: CREATE, payload: "dataVolley" }) }><a  className="modal-trigger" href="#modal1">DataVolley</a></li>
        </ul>
        <div id="modal1" className="modal">
          {createWhat}
          <div className="modal-footer">
            {create_update}
            {del}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { create, update, projects }, auth }) => {
  return { create, auth, update, projects };
}

const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ create_update, removeObj }, dispatch), dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
