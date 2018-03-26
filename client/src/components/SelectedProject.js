import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SELECT_PROJECT } from '../actions/types';

class SelectedProject extends Component{
  renderProject(pr) {
    const { filteredProjects } = this.props;
    const project = filteredProjects.filter( p => { return p._id === pr});
    const { title, description } = project[0];
    return (
      <div>
        <span className="card-title">{title}</span>
        <p>{description}</p>
      </div>
    )
  }
  render(){
    const { dispatch, filteredProjects, selectedProject, selectedProjects } = this.props;
    const project = filteredProjects.filter( p => { return p._id === selectedProject });
    if (selectedProjects !== false && selectedProjects.projects.length >= 1) {
      return (
        <div id="selectedProject">
          <a onClick={ () => dispatch({type: SELECT_PROJECT, payload: null }) } href="#!" className="secondary-content"><i className="material-icons">clear</i></a>
          {selectedProjects.projects.map( p => this.renderProject(p))}
        </div>
      )
    }
        const { title, description, _id } = project[0];
    return(
      <div id="selectedProject">
        <span className="card-title">{title}<a onClick={ () => dispatch({type: SELECT_PROJECT, payload: null }) } href="#!" className="secondary-content"><i className="material-icons">clear</i></a></span>
        <p>{description}</p>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { filteredProjects, selectedProject, selectedProjects } }) => {
  return { filteredProjects, selectedProject, selectedProjects };
}

export default connect(mapStateToProps)(SelectedProject);
