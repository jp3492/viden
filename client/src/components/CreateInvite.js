import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { INVITE } from '../actions/types';

class CreateInvite extends Component{
  componentDidMount(){
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }
  renderGroup(group, i){
    const { dispatch, groups, friends, create: { invites } } = this.props;
    const groupFriends = friends.filter( f => { return f.parent === group._id });
    const groupGroups = groups.filter( g => { return g.parent === group._id });
    let allFriends = [];
    const addFromGroup = group => {
      const childGroups = groups.filter( g => { return g.parent === group });
      const childFriends = friends.filter( f => { return f.parent === group });
      childFriends.map( f => {
        allFriends.push(f._id);
      });
      childGroups.map( g => addFromGroup(g._id));
    }
    addFromGroup(group._id);
    const allFriendsInvited = allFriends.filter( f => { return invites.indexOf(f) !== -1 });
    const checked = (allFriendsInvited.length === allFriends.length) ? true: false;
    if (allFriends.length === 0) {
      return null;
    }
    return (
        <li className="collection-item">
          <div className="collapsible-header"><i className="material-icons">people</i>{group.name}
            <a id={`checkb${i}`} className="secondary-content" onClick={ e => {
              e.preventDefault();
              dispatch({ type: INVITE, payload: { type: "group", _id: group._id, checked, allFriends }});
               } }>
              <input type="checkbox" className="filled-in" id={`check${i}`} checked={checked} />
              <label htmlFor={`check${i}`}></label>
            </a>
          </div>
          <div className="collapsible-body">
            <ul className="collapsible">
              {groupGroups.map( (g, i) => this.renderGroup(g, i))}
              {groupFriends.map( (f, i) => this.renderFriend(f, i))}
            </ul>
          </div>
        </li>
    );
  }
  renderFriend(f, i){
    const { dispatch, create: { invites } } = this.props;
    const checked = (invites.indexOf(f._id) !== -1) ? true: false;
    return (
    <li className="collection-item"><i className="material-icons">person</i>{f.firstName}
      <a id={`checkb${i}`} className="secondary-content" onClick={ e => {
        e.preventDefault();
        dispatch({ type: INVITE, payload: { type: "user", _id: f._id} }); } }>
        <input type="checkbox" className="filled-in" id={`check${i}`} checked={checked} />
        <label htmlFor={`check${i}`}></label>
      </a>
    </li>);
  }
  render(){
    const { groups, friends, create } = this.props;
    const parentGroups = groups.filter( g => { return g.parent === null });
    return(
      <div id="inviteFriends" className="row">
        <div className="col s12">Send Access Invite</div>
        <ul className="collapsible">
          {parentGroups.map( (g, i) => this.renderGroup(g, i))}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { create, groups, friends } }) => {
  return { create, groups, friends };
}
export default connect(mapStateToProps)(CreateInvite);
