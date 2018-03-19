import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendFriendRequest, removeFriend } from '../actions';

class CardHeader extends Component {
  render(){
    const { main: { view, selectedUser, selectedProject, projects, folders, groups }, auth: { friends }, sendFriendRequest, removeFriend } = this.props;
    if (selectedProject !== null) {
      const project = projects.filter( p => { return p._id === selectedProject })
      const { title, parent } = project[0];
      let back;
      if (parent !== null) {
        back = folders.filter( f => { return f._id === parent });
      } else {
        back = null;
      }
      back = (back === null) ? null: `${back[0].name} < `;
      return (
        <span className="card-title">
          {back}
          {title}
          <a
           className="secondary-content btn-floating btn-large waves-effect waves-light new">
           <i className="material-icons editProj">
             edit
           </i>
         </a>
        </span>
      );
    }
    if (selectedUser !== null) {
      const { firstName, lastName, parent } = selectedUser;
      let back = { name: "" };
      if (parent !== null) {
        back = groups.filter( g => { return g._id === parent });
      } else {
        back = null;
      }
      back = (back === null) ? null: `${back[0].name} < `;
      return (
        <span className="card-title">
          {back}
          {firstName+" "+lastName}
          <a
           className="secondary-content btn-floating btn-large waves-effect waves-light new">
           <i className="material-icons editProj">
             edit
           </i>
         </a>
        </span>
      );
    }
    switch (view) {
      case "profile":
        return (
          <div>
            <span className="card-title">
              Profile
              <a
               className="secondary-content btn-floating btn-large waves-effect waves-light new">
               <i className="material-icons editProj">
                 edit
               </i>
             </a>
           </span>
         </div>
        );
      case "contacts": return <span className="card-title">Groups</span>
      case "directory": return <span className="card-title">Directory</span>
      case "notifications": return <span className="card-title">Notifications</span>
    }
    if (selectedUser !== null && friends !== undefined) {
      const { firstName, lastName, _id } = selectedUser;
      const thisUser = friends.filter( f => { return f._id === _id });
      const addFriend = (thisUser.length === 0) ? (
        <a onClick={ () => sendFriendRequest(_id)}
          className="secondary-content btn-floating btn-large waves-effect waves-light new">
          <i className="material-icons editProj">
            person_add
          </i>
        </a>
      ): ((thisUser[0].status === "requestSent") ? (
        <a onClick={ () => removeFriend(_id)}
          className="secondary-content btn-floating btn-large waves-effect waves-light new">
          <i className="material-icons editProj">
            clear
          </i>
        </a>
      ): null);
      return (
        <span className="card-title">{firstName+" "+lastName}
          {addFriend}
        </span>
      );
    }
    return null;
  }
}

const mapStateToProps = ({ main, auth }) => {
  return { main, auth };
}

export default connect(mapStateToProps, { sendFriendRequest, removeFriend })(CardHeader);
