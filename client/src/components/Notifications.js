import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import { answerRequest } from '../actions';

class Notifications extends Component{
  componentDidMount(){
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }
  renderFriend(f){
    const { auth, action: { answerRequest } } = this.props;
    const { firstName, lastName, _id } = f;
    return (
      <li className="collection-item">{firstName+" "+lastName}
        <a href="#" className="secondary-content"
          onClick={ () => answerRequest(auth._id, "friend", null, _id, true )}><i className="material-icons">check</i></a>
        <a href="#" className="secondary-content"
          onClick={ () => answerRequest(auth._id, "friend", null, _id, false )}><i className="material-icons">clear</i></a>
      </li>
    );
  }
  renderAccess(a){
    const { auth, action: { answerRequest } } = this.props;
    const { target, type, status, user, firstName, lastName, name } = a;
    return (
      <li className="collection-item">
        {firstName+" "+lastName+" wants to access your "+type+": "+name}
        <a href="#" className="secondary-content"
          onClick={ () => answerRequest(auth._id, type, target, user, true )}><i className="material-icons">check</i></a>
        <a href="#" className="secondary-content"
          onClick={ () => answerRequest(auth._id, type, target, user, false )}><i className="material-icons">clear</i></a>
      </li>
    );
  }
  render(){
    const { access, friends } = this.props;
    const requestedFriends = friends.filter( f => { return f.status === "requested" });
    const requestedAccess = access.filter( a => { return a.status === "requested" });
    return(
      <ul id="notification" className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header"><i className="material-icons">person_add</i>Friend Requests
            <a href="#" className="right">{requestedFriends.length}</a>
          </div>
          <div className="collapsible-body">
            <ul className="collection">
              {requestedFriends.map( f => this.renderFriend(f))}
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">folder_shared</i>Access Requests
            <a href="#" className="right">{requestedAccess.length}</a>
          </div>
          <div className="collapsible-body">
            <ul className="collection">
              {requestedAccess.map( a => this.renderAccess(a))}
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">announcement</i>Announcements</div>
          <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
      </ul>
    )
  }
}
const mapStateToProps = ({ auth, main: { friends, access } }) => {
  return { auth, friends, access };
}

const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ answerRequest }, dispatch), dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
