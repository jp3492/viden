import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
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
    const { groups, friends } = this.props;
    const groupFriends = friends.filter( f => { return f.parent === group._id });
    const groupGroups = groups.filter( g => { return g.parent === group._id });
    console.log(groupGroups);
    return (
        <li>
          <div className="collapsible-header"><i className="material-icons">people</i>{group.name}
            <a id={`checkb${i}`} className="secondary-content" onClick={ e => {
              e.preventDefault();
              console.log(group._id); } }><p>
              <input type="checkbox" className="filled-in" id={`check${i}`} checked={true} />
              <label htmlFor={`check${i}`}></label>
            </p></a>
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
    return <li className="collection-item"><i className="material-icons">person</i>{f.firstName}
      <a id={`checkb${i}`} className="secondary-content" onClick={ e => {
        e.preventDefault();
        console.log(f._id); } }><p>
        <input type="checkbox" className="filled-in" id={`check${i}`} checked={true} />
        <label htmlFor={`check${i}`}></label>
      </p></a>
    </li>;
  }
  render(){
    const { groups, friends, create } = this.props;
    const parentGroups = groups.filter( g => { return g.parent === null });
    const grouplessFriends = friends.filter( f => { return f.parent === null });
    return(
      <div id="inviteFriends" className="row">
        <div className="col s12">Send Access Invite</div>
        <ul className="collapsible">
          {parentGroups.map( (g, i) => this.renderGroup(g, i))}
          {grouplessFriends.map( (f, i) => this.renderFriend(f, i))}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { create, groups, friends } }) => {
  return { create, groups, friends };
}
export default connect(mapStateToProps)(CreateInvite);
