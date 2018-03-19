import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component{
  render(){
    const { _id, firstName, lastName, email, projects, friends, access } = this.props;
    const myProjects = projects.filter( p => { return p._uid === _id });
    const myFriends = friends.filter( f => { return f.status === "confirmed" });
    const accessGiven = access.filter( a => {
      if (a.type === "project") {
        const isMine = myProjects.filter( p => { return p._id === a.target });
        if (isMine.length !== 0) {
          return true;
        }
        return false;
      }
      return false;
    });
    return(
      <div id="profile">
        <div id="profile-head" className="row">
          <img className="col s5" id="profile-pic" src={require("../media/profile.jpg")} />
          <span className="card-title">{firstName}</span>
          <span className="card-title">{lastName}</span>
          <a>{email}</a>
        </div>
        <div id="profile-body">
          <ul className="collection">
            <li className="collection-item">
              <div>
                <a><i className="material-icons">people</i></a>
                Friends
                <a href="#!" className="secondary-content">{myFriends.length}</a>
              </div>
            </li>
            <li className="collection-item">
              <div>
                <a><i className="material-icons">folder</i></a>
                Projects
                <a href="#!" className="secondary-content">{myProjects.length}</a>
              </div>
            </li>
            <li className="collection-item">
              <div>
                <a><i className="material-icons">share</i></a>
                Shared Access
                <a href="#!" className="secondary-content">{accessGiven.length}</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ auth: { _id, firstName, lastName, email }, main: { projects, friends, access } }) => {
  return { _id, firstName, lastName, email, projects, friends, access };
}

export default connect(mapStateToProps)(Profile);
