import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
// import { changeLink, changeTitle, postHighlights, add_video, removeLink, changeDesciption, setFolder } from '../actions';
import { addToDataArray, changeParent, changeName, changeDesciption, changePrivacy, addLink } from '../actions';
const load = (<div className="preloader-wrapper small active"><div className="spinner-layer spinner-green-only"><div className="circle-clipper left">
        <div className="circle"></div></div><div className="gap-patch"><div className="circle"></div></div><div className="circle-clipper right">
        <div className="circle"></div></div></div></div>);

class NewHighlights extends Component{
  componentDidMount(){
    const { addToDataArray, changeParent, changePrivacy } = this.props;
    $(document).ready(function() {
      $('select').material_select();
      $('#selectMulti').on('change', () => {
        addToDataArray(true, $('#selectMulti').val());
      });
      $('#selectParent').on('change', () => {
        changeParent($('#selectParent').val());
      });
      $('#selectPrivacy').on('change', () => {
        changePrivacy($('#selectPrivacy').val());
      });
    });
  }
  addData(){
    const { type, friends, addLink } = this.props;
    if ( type === "project") {
      return (
        <div className="row">
          <input id="link" type="text" className="col s10" placeholder="Add Video-Link..." />
          <button onClick={ () => addLink(document.getElementById("link").value) }className="col s2 btn">Add</button>
        </div>
      );
    } else if (type === "group") {
      return (
        <div className="input-field col s12">
          <select id="selectMulti" multiple>
            <option value="" disabled selected>Add Friends to Group...</option>
            {friends.map( f => this.renderFriend(f))}
          </select>
          <label>Materialize Multiple Select</label>
        </div>
      );
    }
    return null;
  }
  renderFriend(f){
    const { addToDataArray } = this.props;
    return <option onClick={ () => alert("shit")} value={f._id}>{f.firstName+" "+f.lastName}</option>;
  }
  renderMember(m){
    return <p>{m}</p>;
  }
  renderVideos(v){
    return <p>{v.title}</p>;
  }
  renderDataArray(){
    const { type, dataArray } = this.props;
    switch (type) {
      case "folder":    return null;
      case "project":   return dataArray.map( v => this.renderVideos(v));
      case "group":     return dataArray.map( m => this.renderMember(m));
    }
  }
  renderParents(){
    const { type, folders, groups } = this.props;
    let parents = (type === "group") ? groups: folders;
    if (parents === undefined) {
      parents = [];
    }
    return(
      <div className="input-field col s12"  onChange={ e => alert(e.target)}>
        <select id="selectParent">
          <option value="" disabled selected>Choose Parent...</option>
          {parents.map( p => this.renderParent(p) )}
        </select>
      </div>
    )
  }
  renderParent(p){
    return <option value={p._id}>{p.name}</option>;
  }
  renderPrivacy(){
    const { type } = this.props;
    if (type !== "group") {
      return (
        <div className="input-field col s12">
          <select id="selectPrivacy">
            <option value="" disabled selected>Privacy...</option>
            <option value="private">Private: Only I can see this</option>
            <option value="public">Public: Everyone can see this</option>
            <option value="friends">Friends: Only my Friends can see this</option>
            <option value="password">Password: Access only with password</option>
          </select>
        </div>
      );
    }
    return null;
  }
  render(){
    const { changeName, changeDesciption, name, description } = this.props;
    return(
      <div>
        <input type="text" placeholder="Name..."        value={name}        onChange={ e => changeName(e.target.value) } />
        <input type="text" placeholder="Description..." value={description} onChange={ e => changeDesciption(e.target.value) }/>
        {this.renderParents()}
        {this.renderPrivacy()}
        {this.addData()}
        {this.renderDataArray()}
      </div>
    )
  }
}

const mapStateToProps = ({ creating: { type, dataArray, name, description }, auth: { friends, folders, groups } }) => {
  return{ type, dataArray, friends, folders, groups, name, description } }

export default connect(mapStateToProps, { addToDataArray, changeParent, changeName, changeDesciption, changePrivacy, addLink })(NewHighlights);
