import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import { create_update, removeObj } from '../actions';
import { CREATE, CLEAR_CREATE, REMOVE } from '../actions/types';

import CreateProject from './CreateProject';
import CreateFolder from './CreateFolder';
import CreateGroup from './CreateGroup';
import UpdateUser from './UpdateUser';

class Create extends Component{
  componentDidMount(){
    $('.create-drop').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: true // Stops event propagation
      }
    );
    $(document).ready(function(){
      $('.modal').modal();
    });
  }
  submitCreate(update){
    const { action, create, auth } = this.props;
    action.create_update(update, create, auth._id);
    $('.modal').modal('close');
  }
  deleteObj(){
    const { action, create, auth } = this.props;
    action.removeObj({ _id: create._id, type: create.type }, auth._id);
    $('.modal').modal('close');
  }
  render(){
    const { dispatch, create, update } = this.props;
    const createWhat = (create === null) ? null: (create.type === "project") ? <CreateProject />: (create.type === "folder") ? <CreateFolder />: (create.type === "group") ? <CreateGroup />: <UpdateUser />;
    const del = (update === true) ?
      <a onClick={ () => this.deleteObj() }
        id="delete_btn" className="left btn waves-effect waves-green">Delete</a>: null;
    const create_update = (update === true) ?
      <a onClick={ () => this.submitCreate(true) } id="create_btn" ref="#" className="btn waves-effect waves-green">Update</a>:
      <a onClick={ () => this.submitCreate(false) } id="create_btn" ref="#" className="btn waves-effect waves-green">Create</a>
    return(
      <div className="col s1 row" id="bodyCreate">
        <a className='dropdown-button create-drop btn col s12' href='#' data-activates='dropdown2'>New</a>
        <ul id='dropdown2' className='dropdown-content col s12'>
          <li><a onClick={ () => dispatch({ type: CREATE, payload: "project" }) } className="modal-trigger" href="#modal1">Project<i className="material-icons">insert_drive_file</i></a></li>
          <li><a onClick={ () => dispatch({ type: CREATE, payload: "folder" }) } className="modal-trigger" href="#modal1">Folder<i className="material-icons">folder</i></a></li>
          <li><a onClick={ () => dispatch({ type: CREATE, payload: "group" }) } className="modal-trigger" href="#modal1">Group<i className="material-icons">people</i></a></li>
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
