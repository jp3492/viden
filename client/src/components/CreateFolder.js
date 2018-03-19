import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { CHANGE_CREATE_ATTRIBUTE, CLEAR_CREATE } from '../actions/types';

class CreateFolder extends Component{
  componentDidMount(){
    const { dispatch } = this.props;
    $(document).ready(function() {
      $('select').material_select();
      $('#parent').on('change', () => {
        dispatch({ type: CHANGE_CREATE_ATTRIBUTE, payload: { key: "parent", value: $('#parent').val() } });
      });
      $('#privacy').on('change', () => {
        dispatch({ type: CHANGE_CREATE_ATTRIBUTE, payload: { key: "privacy", value: $('#privacy').val() } });
      });
    });
  }
  renderFolder(f, dispatch){
    const { name, _id } = f;
    return <option value={_id}>{name}</option>;
  }
  render(){
    const { dispatch, folders, create } = this.props;
    return(
      <div className="modal-content">
        <h4>Create Folder<a onClick={ () => dispatch({type: CLEAR_CREATE }) } href="#" className="secondary-content modal-close"><i className="material-icons">clear</i></a></h4>
        <div className="row">
          <div className="input-field col s12">
            <input
              onChange={ e => dispatch({ type: CHANGE_CREATE_ATTRIBUTE, payload: { key: "name", value: e.target.value } }) }
              value={create.name} id="name" type="text" className="validate" />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field col s12">
            <select id="parent">
              <option value="" disabled selected>Choose parent folder...</option>
              {folders.map( f => this.renderFolder(f, dispatch))}
            </select>
          </div>
          <div className="input-field col s12">
            <input
              onChange={ e => dispatch({ type: CHANGE_CREATE_ATTRIBUTE, payload: { key: "description", value: e.target.value } }) }
              value={create.description}
              id="description" type="text" className="validate" />
            <label htmlFor="description">Description</label>
          </div>
          <div className="input-field col s12">
            <select id="privacy">
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { create, folders } }) => {
  return { create, folders };
}

export default connect(mapStateToProps)(CreateFolder);
