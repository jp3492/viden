import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SELECT_PROJECT } from '../actions/types';

class Project extends Component{
  render(){
    const { dispatch, title, description, selectedProject, id } = this.props;
    const className = (selectedProject === id) ? "collection-item projectSelected": "collection-item";
    return(
      <li className={className} onClick={ () => dispatch({ type: SELECT_PROJECT, payload: id })}>
        {title+" - "+description}
      </li>
    )
  }
}
const mapStateToProps = ({ main: { selectedProject } }) => {
  return { selectedProject };
}

export default connect(mapStateToProps)(Project);
