import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectHighlights, setSearch, searchProject, searchFocused, changeView, changeFolderOfProject, saveProjectToFolder,
changeSearchOption, selectUser, setCreate, changeGroupOfFriend, changeLocal } from '../actions';
import $ from 'jquery';

import NewHighlights from './NewHighlights';
import Profile from './Profile';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

class Home extends Component{
  componentDidMount(){
    this.removeSelected();
    this.initiateDrop();
  }
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
  removeSelected(){
    let items = document.getElementsByClassName("projectsItem");
    for(let i = 0; i < items.length; i++){
      items[i].classList.remove("selected");
    }
  }
  renderFolders(folder, id, uid){
    const { changeFolderOfProject, saveProjectToFolder, auth } = this.props;
    const { name, _id } = folder;
    if (auth._id === uid) {
      return <li  className="center-align col s12" onClick={() => changeFolderOfProject(id, _id)}><a>{name}</a></li>;
    }
    return <li className="center-align" onClick={() => changeFolderOfProject(id, _id)}><a>{name}</a></li>;
  }
  renderProjectFooter(uid, i, parent, _id){
    const { auth } = this.props;
    if (auth) {
      const dropdown = `dropdown${i}`;
      let folderName = auth.folders.filter( f => { return f._id === parent });
      if (folderName.length === 0 && auth._id !== uid) { folderName = [{ name:"Save to..." }] }
      else if (folderName.length === 0) { folderName = [{ name:"Save to Folder" }] }
      return (
        <div>
          <a materialize="dropdown" className='dropdown-button btn folderBtn' href='#' data-activates={dropdown}>{folderName[0].name}</a>
          <ul id={dropdown} className='dropdown-content'>
            {auth.folders.map( f => this.renderFolders(f, _id, uid)) }
          </ul>
        </div>
      );
    }
    return  <a href="#" className="projOwner">Login to save</a>;

  }
  renderHighlight(highlight, i){
    const { title, _id, description, _uid, parent }                     = highlight;
    const { selectHighlights, selectedHighlights, history, changeView } = this.props;
    return(
        <div className="col s3">
          <div
            onDoubleClick={ () => selectHighlights( true, selectedHighlights, history ) }
            onClick={ () =>  {
              changeView("selectedProject");
              this.removeSelected();
              document.getElementById(_id).classList.add("selected");
              selectHighlights( false, highlight ); }}
            className="card projectsItem" id={_id}>

            <div className="card-content white-text">
              <span className="card-title">{title}</span>
              <p>{description}</p>
            </div>
            <div className="card-action">
              {this.renderProjectFooter(_uid, i, parent, _id)}
            </div>
          </div>
        </div>
    )
  }
  renderSearch(term, option){
    const { setSearch, history, searchProject } = this.props;
    setSearch(term);
    searchProject(term, history, option);
  }
  focusSearch(){
    const { searchFocused } = this.props;
    this.removeSelected();
    searchFocused();
  }
  renderClear(){
    const { search, setSearch } = this.props;
    if (search.term.length > 0) {
      return (
        <a onClick={() => setSearch("") }>
          <i id="clearSearch" className="material-icons editProj">
            clear
          </i>
        </a>
      )
    }
  }
  renderSearchOption(){
    const { main: { searchOption }, changeSearchOption } = this.props;
    return (
      <div id="changeSearchOption" className=" col s2">
        <a id="changeSearchBtn" materialize="dropdown" className='dropdown-button btn folderBtn' href='#' data-activates="searchOption">{searchOption}</a>
        <ul id="searchOption" className='dropdown-content'>
          <li  className="center-align col s12" onClick={() => changeSearchOption("projects")}><a>Projects</a></li>
          <li  className="center-align col s12" onClick={() => changeSearchOption("people")}><a>People</a></li>
          <li  className="center-align col s12" onClick={() => changeSearchOption("sequences")}><a>Sequences</a></li>
        </ul>
      </div>
    )
  }
  renderUserFooter(_id, i, parent){
    const { auth, main: { groups} } = this.props;
    if (auth) {
      const dropdown = `dropd${i}`;
      let groupName = groups.filter( g => { return g._id === parent });
      if (groupName.length === 0 && auth._id !== _id) { groupName = [{ name:"Save to..." }] }
      else if (groupName.length === 0) { groupName = [{ name:"Save to Group" }] }
      return (
        <div>
          <a materialize="dropdown" className='dropdown-button btn folderBtn' href='#' data-activates={dropdown}>{groupName[0].name}</a>
          <ul id={dropdown} className='dropdown-content'>
            {groups.map( g => this.renderGroups(g, _id)) }
          </ul>
        </div>
      );
    }
    return  <a href="#" className="projOwner">Login to save</a>;
  }
  renderGroups(group, _id){
    const { name } = group;
    const { changeGroupOfFriend } = this.props;
    return <li className="center-align" onClick={ () => changeGroupOfFriend(_id, group._id) }><a>{name}</a></li>;
  }
  renderUser(user, i){
    const { firstName, lastName, email, _id, parent } = user;
    const { changeView, selectUser } = this.props;
    const id = `user${i}`;
    return(
        <div className="col s3">
          <div className="card projectsItem" id={id}
            onClick={ () => {
              this.removeSelected();
              document.getElementById(id).classList.add("selected");
              selectUser(user);
              }}>

            <div className="card-content white-text">
              <span className="card-title">{firstName+" "+lastName}</span>
              <p>{email}</p>
            </div>
            <div className="card-action">
              {this.renderUserFooter(_id, i, parent)}
            </div>
          </div>
        </div>
    )
  }
  renderResults(){
    const { main: { searchResult, filteredProjects, selectedUser, view, filteredFriends } } = this.props;
    if (view === "contacts") {
      return filteredFriends.map( (f, i) => this.renderUser(f, i))
    }
    if (view === "directory") {
      return filteredProjects.map( (highlight, i) => this.renderHighlight(highlight, i) );
    }
    if (searchResult === null) {
      return filteredProjects.map( (highlight, i) => this.renderHighlight(highlight, i) );
    } else {
      if (searchResult.option === "projects") {
        return searchResult.data.map( (highlight, i) => this.renderHighlight(highlight, i) );
      }
      return searchResult.data.map( (user, i) => this.renderUser(user, i) );
    }
  }
  render(){
    const { search, main: { filteredProjects, searchOption, searchResult, local }, changeView, setCreate, changeLocal } = this.props;
    this.initiateDrop();
    const localClass = (local === null) ? "": (local === true) ? "publicSelected": "";
    return(
      <div className="row">
        <div className="row" id="mainW">
          <div className="col s4" id="links">
            <div className="card blue-grey darken-1 infoCard">
              <div className="card-content white-text" id="profile">
                <Profile />
              </div>
              <div className="card-content white-text" >
                <CardHeader />
                <CardBody />
              </div>
              <div className="card-action infoCardFoot">
                <CardFooter />
              </div>
            </div>
          </div>
          <div className="col s8" id="rechts">
            <div id="searchProjects" className="row">
              <div className="center-align col s1">
                <a id="publicSearch" href='#' onClick={ () => changeLocal()}>
                  <i id="publicIcon" className={`material-icons editProj ${localClass}`}>
                    public
                  </i>
                </a>
              </div>
              {this.renderSearchOption()}
              <input className="col s8" onChange={ e => this.renderSearch(e.target.value, searchOption)} onFocus={() => this.focusSearch()} value={search.term} id="searchProj" placeholder="Search..."/>

              {this.renderClear()}
            </div>
            <ul className="row" id="projectsCollection">
              {this.renderResults()}
            </ul>
          </div>
        </div>
        <a id="addProject" onClick={ () => { setCreate("project", true); } }
          className="secondary-content btn-floating btn-large waves-effect waves-light orange new">
          <i className="material-icons">
          note_add
          </i>
        </a>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, search, highlights: { list, selectedHighlights }, main }) => {
  return{ auth, search, list, selectedHighlights, main } }

export default connect(mapStateToProps, { selectHighlights, setSearch, searchProject, searchFocused, changeView, changeFolderOfProject,
saveProjectToFolder, changeSearchOption, selectUser, setCreate, changeGroupOfFriend, changeLocal })(Home);
