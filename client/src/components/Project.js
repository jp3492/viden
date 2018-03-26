import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SELECT_PROJECT, ADD_PROJECT } from '../actions/types';

class Project extends Component{
  render(){
    const { dispatch, title, description, selectedProject, id, selectedProjects } = this.props;
    const className = (selectedProject === id) ? "collection-item projectSelected row": "collection-item row";
    const checked = (selectedProjects === false) ? false: (selectedProjects.projects.indexOf(id) !== -1) ? true: false;
    const multiple = (selectedProjects !== false) ?
      <a id={`checkbox${id}`} className="secondary-content" onClick={ e => {
        e.preventDefault();
        dispatch({ type: ADD_PROJECT, payload: id });
         } }>
          <input type="checkbox" className="filled-in" id={id} checked={checked} />
          <label htmlFor={id}></label>
      </a>: null;
    return(
      <li className={className} onClick={ () => dispatch({ type: SELECT_PROJECT, payload: id })}>
        <div><div className="col s3">{title}</div><div className="col s3">{description}</div>{multiple}</div>
      </li>
    )
  }
}
const mapStateToProps = ({ main: { selectedProject, selectedProjects } }) => {
  return { selectedProject, selectedProjects };
}

export default connect(mapStateToProps)(Project);
