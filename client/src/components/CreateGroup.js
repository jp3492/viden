import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { CHANGE_CREATE_ATTRIBUTE, CLEAR_CREATE } from '../actions/types';

class CreateGroup extends Component{
  componentDidMount(){
    const { dispatch } = this.props;
    $(document).ready(function() {
      $('select').material_select();
      $('#parent').on('change', () => {
        dispatch({ type: CHANGE_CREATE_ATTRIBUTE, payload: { key: "parent", value: $('#parent').val() } });
      });
    });
  }
  renderGroup(g, dispatch){
    const { name, _id } = g;
    return <option value={_id}>{name}</option>;
  }
  render(){
    const { dispatch, groups, create } = this.props;
    return(
      <div className="modal-content">
        <h4>Create Group<a onClick={ () => dispatch({type: CLEAR_CREATE }) } className="secondary-content modal-close"><i className="material-icons">clear</i></a></h4>
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
              {groups.map( g => this.renderGroup(g, dispatch))}
            </select>
          </div>
          <div className="input-field col s12">
            <input
              onChange={ e => dispatch({ type: CHANGE_CREATE_ATTRIBUTE, payload: { key: "description", value: e.target.value } }) }
              value={create.description}
              id="description" type="text" className="validate" />
            <label htmlFor="description">Description</label>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { create, groups } }) => {
  return { create, groups };
}

export default connect(mapStateToProps)(CreateGroup);
