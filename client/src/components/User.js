import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SELECT_USER } from '../actions/types';

class User extends Component{
  render(){
    const { dispatch, firstName, lastName, id, selectedUser } = this.props;
    const className = (selectedUser === id) ? "collection-item userSelected": "collection-item";
    return(
      <li className={className} onClick={ () => dispatch({ type: SELECT_USER, payload: id })}>
        {firstName+" "+lastName}
      </li>
    )
  }
}
const mapStateToProps = ({ main: { selectedUser } }) => {
  return { selectedUser };
}
export default connect(mapStateToProps)(User);
