import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SELECT_PROJECT } from '../actions/types';

class SelectedProject extends Component{
  render(){
    const { dispatch, filteredProjects, selectedProject } = this.props;
    const project = filteredProjects.filter( p => { return p._id === selectedProject });
    const { title, description, _id } = project[0];
    return(
      <div id="selectedProject">
        <span className="card-title">{title}<a onClick={ () => dispatch({type: SELECT_PROJECT, payload: null }) } href="#!" className="secondary-content"><i className="material-icons">clear</i></a></span>
        <p>{description}</p>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { filteredProjects, selectedProject } }) => {
  return { filteredProjects, selectedProject };
}

export default connect(mapStateToProps)(SelectedProject);
