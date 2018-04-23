import React, { Component } from 'react';
import { connect } from 'react-redux';

import Directory from './Directory';
import Groups from './Groups';
import Profile from './Profile';
import Notifications from './Notifications';
import SelectedProject from './SelectedProject';
import SelectedUser from './SelectedUser';
import Edit from './Edit';

class BodyLeft extends Component{
  render(){
    const { view, selectedProject, selectedUser, selectedProjects } = this.props;
    let showThis;
    switch (view) {
      case "profile": showThis = <Profile />; break;
      case "groups": showThis = <Groups />; break;
      case "directory": showThis = <Directory />; break;
      case "notifications": showThis = <Notifications />; break;
      default: showThis = null; break;
    }
    if (selectedUser !== null) { showThis = <SelectedUser /> }
    if (selectedProject !== null) { showThis = <SelectedProject /> }
    else if (selectedProjects !== false) {
      if (selectedProjects.projects.length !== 0) {
        showThis = <SelectedProject />
      }
    }
    return(
      <div id="bodyLeft" className="col s3">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                {showThis}
              </div>
              <Edit />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { view, selectedProject, selectedUser, selectedProjects } }) => {
  return { view, selectedProject, selectedUser, selectedProjects };
}

export default connect(mapStateToProps)(BodyLeft);
