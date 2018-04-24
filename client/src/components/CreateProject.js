import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { CHANGE_CREATE_ATTRIBUTE, CLEAR_CREATE, CREATE_REMOVE_VIDEO } from '../actions/types';
import CreateInvite from './CreateInvite';

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
    return <option key={_id} value={_id}>{name}</option>;
  }
  renderVideos(v, dispatch, admin, copy){
    if (admin === true && copy !== true) {
      return <li className="collection-item">{v}<a onClick={ () => dispatch({type: CREATE_REMOVE_VIDEO, payload: v }) } className="secondary-content"><i className="material-icons">clear</i></a></li>;
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
  renderLink(admin, dispatch, copy){
    if (copy) {
      return null;
    }
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
    const { auth, dispatch, folders, create, copy } = this.props;
    if (create === null) {
      return null;
    }
    const admin = (auth._id === create._uid) ? true: (create._id === undefined) ? true: false;
    const head = (copy === true) ? "Copy Project": "Create Project";
    const invite = (admin) ? <CreateInvite />: null;
    return(
      <div className="modal-content">
        <h4>{head}<a onClick={ () => dispatch({type: CLEAR_CREATE }) } className="secondary-content modal-close"><i className="material-icons">clear</i></a></h4>
        <div className="row">
          <div className="col s7">
            <div className="input-field col s12">
              {this.renderName(create.title, dispatch, admin)}
            </div>
            <div className="input-field col s12">
              {this.renderLink(admin, dispatch, copy)}
            </div>
            <div className="col s12">
              <ul className="collection">
                {create.videos.map( v => this.renderVideos(v, dispatch, admin, copy))}
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
          <div className="col s5" id="invite">
            {invite}
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
