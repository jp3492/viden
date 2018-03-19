import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { CHANGE_CREATE_ATTRIBUTE, CLEAR_CREATE, CREATE_REMOVE_VIDEO } from '../actions/types';

class CreateProject extends Component{
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
  renderFolder(f){
    const { name, _id } = f;
    return <option value={_id}>{name}</option>;
  }
  renderVideos(v, dispatch, admin){
    if (admin === true) {
      return <li className="collection-item">{v}<a onClick={ () => dispatch({type: CREATE_REMOVE_VIDEO, payload: v }) } href="#" className="secondary-content"><i className="material-icons">clear</i></a></li>;
    } else {
      return <li className="collection-item">{v}</li>;
    }
  }
  renderName(title, dispatch, admin){
    if (admin === true) {
      return (
        <div>
          <input
            onChange={ e => dispatch({ type: CHANGE_CREATE_ATTRIBUTE, payload: { key: "title", value: e.target.value } }) }
            value={title} id="name" type="text" className="validate" />
          <label htmlFor="name">Name</label>
        </div>
      );
    }
    return <p>{title}</p>;
  }
  renderLink(admin, dispatch){
    if (admin === true) {
      return(
        <div>
          <input
            onChange={ e => dispatch({ type: CHANGE_CREATE_ATTRIBUTE, payload: { key: "videos", value: e.target.value } }) }
            value="" id="videos" type="text" className="validate" />
          <label htmlFor="name">Video-link</label>
        </div>
      );
    }
    return null;
  }
  renderDescription(description, dispatch, admin){
    if (admin === true) {
      return (
        <div>
          <input
            onChange={ e => dispatch({ type: CHANGE_CREATE_ATTRIBUTE, payload: { key: "description", value: e.target.value } }) }
            value={description}
            id="description" type="text" className="validate" />
          <label htmlFor="description">Description</label>
        </div>
      );
    }
    return <p>{description}</p>;
  }
  renderPrivacy(privacy, admin){
    if (admin === true) {
      return (
        <select id="privacy">
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      );
    }
    return <p>{privacy}</p>;
  }
  render(){
    const { auth, dispatch, folders, create } = this.props;
    const admin = (auth._id === create._uid) ? true: (create._id === undefined) ? true: false;
    return(
      <div className="modal-content">
        <h4>Create Project<a onClick={ () => dispatch({type: CLEAR_CREATE }) } href="#" className="secondary-content modal-close"><i className="material-icons">clear</i></a></h4>
        <div className="row">
          <div className="input-field col s12">
            {this.renderName(create.title, dispatch, admin)}
          </div>
          <div className="input-field col s12">
            {this.renderLink(admin, dispatch)}
          </div>
          <div className="col s12">
            <ul className="collection">
              {create.videos.map( v => this.renderVideos(v, dispatch, admin))}
            </ul>
          </div>
          <div className="input-field col s12">
            <select id="parent">
              <option value="" disabled selected>Choose parent folder...</option>
              {folders.map( f => this.renderFolder(f, dispatch))}
            </select>
          </div>
          <div className="input-field col s12">
            {this.renderDescription(create.description, dispatch, admin)}
          </div>
          <div className="input-field col s12">
            {this.renderPrivacy(create.privacy, admin)}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ auth, main: { create, folders } }) => {
  return { auth, create, folders };
}

export default connect(mapStateToProps)(CreateProject);
