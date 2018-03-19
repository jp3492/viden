import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { selectFolder, selectGroup, confirmRequest, removeFriend, changeGroupOfFriend } from '../actions';

import NewHighlights from './NewHighlights';

class CardBody extends Component{
  initiateDrop(){
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
  }
  renderGroup(g){
    const { name, description, privacy, friends, _id } = g;
    const { selectGroup, groups } = this.props;
    const children = groups.filter( g => { return g.parent === _id })
    return (
      <li key={_id} >
        <div onClick={ () => selectGroup(_id) } className="collapsible-header"><i className="material-icons">group</i>{name+" - "+description}</div>
        {this.renderChildrenGroups(children)}
      </li>
    );
  }
  renderChildrenGroups(children){
    $(document).ready(function(){ $('.collapsible').collapsible() });
    if (children.length === 0) { return null }
    return (
      <div className="collapsible-body">
        <ul className="collapsible" data-collapsible="accordion">
          {children.map( c => this.renderGroup(c))}
        </ul>
      </div>
    );
  }

  renderFolder(f){
    const { name, description, privacy, parent, projects, _id } = f;
    const { selectFolder, folders } = this.props;
    const children = folders.filter( f => { return f.parent === _id })
    return (
      <li key={_id} >
        <div onClick={ () => selectFolder(_id) } className="collapsible-header"><i className="material-icons">group</i>{name+" - "+description}</div>
        {this.renderChildrenFolders(children)}
      </li>
    );
  }

  renderChildrenFolders(children){
    $(document).ready(function(){ $('.collapsible').collapsible() });
    if (children.length === 0) { return null }
    return (
      <div className="collapsible-body">
        <ul className="collapsible" data-collapsible="accordion">
          {children.map( c => this.renderFolder(c))}
        </ul>
      </div>
    );
  }

  renderFriendRequest(r){
    const { confirmRequest, removeFriend } = this.props;
    const { _id, firstName, lastName } = r;
    return (
      <li className="collection-item friendRequests">
        {firstName+" "+lastName}
        <a href="#!" className="secondary-content">
          <i onClick={ () => confirmRequest(_id)} className="material-icons">
            check
          </i>
          <i onClick={ () => removeFriend(_id)} className="material-icons">
            clear
          </i>
        </a>
      </li>
    );
  }
  renderGroups(g, id){
    const { name, _id } = g;
    const { changeGroupOfFriend } = this.props;
    return <li onClick={ () => changeGroupOfFriend(id, _id)} className="center-align"><a>{name}</a></li>;
  }
  renderNewFriend(f, i){
    const { firstName, lastName, _id } = f;
    const { groups } = this.props;
    const dropdown = `drop${i}`;
    return (
      <li className="collection-item friendRequests">
        {firstName+" "+lastName}
        <a className="secondary-content assignGroup">
          <div>
            <a materialize="dropdown" className='dropdown-button btn folderBtn' href='#' data-activates={dropdown}>Assign Group...</a>
            <ul id={dropdown} className='dropdown-content'>
              {groups.map( g => this.renderGroups(g, _id)) }
            </ul>
          </div>
        </a>
      </li>
    );
  }
  render(){
    this.initiateDrop();
    $(document).ready(function(){ $('.collapsible').collapsible() });
    const { type, view, groups, friends, folders, create, selectedProject, projects } = this.props;
    if (create === true) {
      return <NewHighlights />;
    }
    if (selectedProject !== null) {
      const project = projects.filter( p => { return p._id === selectedProject });
      return <div>{project[0].description}</div>;
    }
    switch (view) {
      case "contacts":
        const parentGroups = groups.filter( g => { return g.parent === null});
        const newFriends = friends.filter( f => { return (f.parent === null && f.status === "confirmed") });
        return (
          <div>
            <ul className="collapsible" data-collapsible="accordion">
              {parentGroups.map( g => this.renderGroup(g))}
            </ul>
            <span className="card-title">New Contacts:</span>
            <ul className="collection">
              {newFriends.map( (f, i) => this.renderNewFriend(f, i))}
            </ul>
          </div>
        );
      case "directory":
      const parentFolders = folders.filter( f => { return f.parent === null });
        return (
          <ul className="collapsible" data-collapsible="accordion">
            {parentFolders.map( f => this.renderFolder(f))}
          </ul>
        );
      case "notifications":
        const friendRequests = friends.filter( f => { return f.status === "requested"});
        return (
          <div className="row">
            <span className="card-title">Friend Requests:</span>
            <ul className="collection">
              {friendRequests.map( r => this.renderFriendRequest(r))}
            </ul>
            <span className="card-title">Access Requests:</span>
          </div>
        );
    }
    return null;
  }
}

const mapStateToProps = ({  creating: { type, create }, main: { view, folders, selectedProject, projects }, auth: { groups, friends } }) => {
  return { type, view, groups, friends, folders, create, selectedProject, projects };
}

export default connect(mapStateToProps, { selectFolder, selectGroup, confirmRequest, removeFriend, changeGroupOfFriend })(CardBody);
