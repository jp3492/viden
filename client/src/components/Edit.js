import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import { request } from '../actions';
import { UPDATE, LOGOUT, CHANGE_PAGE } from '../actions/types';

class Edit extends Component{
  logout(dispatch){
    dispatch({ type: LOGOUT });
    window.location.href = "/api/logout";
  }
  render(){
    const { auth, history, dispatch, view, selectedGroup, selectedFolder, selectedUser, selectedProject, friends, filteredFriends, projects, access, filteredProjects, action: { request } } = this.props;
    const what = (view === "directory") ? "Folder": "Group";
    const type = (selectedUser !== null) ? "user": (selectedProject !== null) ? "project": (selectedGroup !== null) ? "group": "folder";
    const edit = <a onClick={ () => { dispatch({ type: UPDATE, payload: type }); $('.modal').modal('open'); } } className="btn-flat">Edit</a>;
    const viewing = <a onClick={ () => { dispatch({ type: CHANGE_PAGE, payload: "player" }); history.push('/player'); } } className="btn">View</a>;
    let buttons;
    if ((selectedFolder !== null && selectedProject === null) || (selectedGroup !== null && selectedUser === null)) {
      buttons = <div>{edit}</div>;
    } else if (selectedProject !== null) {
      const selPro = projects.filter( p => { return p._id === selectedProject });
      if (selPro.length !== 0) {
        buttons = <div>{viewing}{edit}</div>
      } else {
        const requestedProject = access.filter( a => { return a.target === selectedProject });
        if (requestedProject.length === 0) {
          const project = filteredProjects.filter( p => { return p._id === selectedProject});
          buttons = <a onClick={ () => { request(auth._id, "project", selectedProject, project[0]._uid) }} className="btn-flat">Request</a>;
        } else {
          buttons = <a>Request sent</a>;
        }
      }
    } else if (selectedUser !== null) {
      const selFri = filteredFriends.filter( f => { return f._id === selectedUser });
      buttons = (selFri[0].status === "confirmed") ? edit:
                (selFri[0].status === "requested") ? <a>Confirm Request in Notifications</a>:
                (selFri[0].status === "requestSent") ? <a>Request Sent</a>:
                <a onClick={ () => { request(auth._id, "friend", null, selectedUser) }} className="btn-flat">Request</a>;
    }
    buttons = (view === "profile") ? <a onClick={ () => this.logout(dispatch)} className="btn-flat">Logout</a>: buttons;
    return (
      <div id="edit" className="card-action">
        {buttons}
      </div>
    )
  }
}
const mapStateToProps = ({ auth, main: { view, selectedGroup, selectedFolder, selectedUser, selectedProject, friends, filteredFriends, projects, filteredProjects, access } }) => {
  return { auth, view, selectedGroup, selectedFolder, selectedUser, selectedProject, friends, projects, filteredProjects, filteredFriends, access };
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ request }, dispatch), dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));
