import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SELECT_USER } from '../actions/types';

class SelectedUser extends Component{
  render(){
    const { dispatch, selectedUser, filteredFriends } = this.props;
    const user = filteredFriends.filter( f => { return f._id === selectedUser });
    const { firstName, lastName, _id } = user[0];
    return(
      <div id="selectedUser">
        <span className="card-title">{firstName+lastName}<a onClick={ () => dispatch({type: SELECT_USER, payload: null }) } href="#!" className="secondary-content"><i className="material-icons">clear</i></a></span>
        <p>User information come here...</p>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { filteredFriends, selectedUser } }) => {
  return { filteredFriends, selectedUser };
}

export default connect(mapStateToProps)(SelectedUser);
