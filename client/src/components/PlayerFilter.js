import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CHANGE_SEARCH_TERM, COPY } from '../actions/types';

class PlayerFilter extends Component{

  render(){
    const { history, dispatch, searchTerm, filteredProjects, selectedProject, selectedProjects, copy } = this.props;
    const multiple = (selectedProjects !== false) ? { projects: selectedProjects.projects.length, videos: selectedProjects.videos.length, highlights: selectedProjects.highlights.length }: null;
    const project = (multiple === null) ? filteredProjects.filter( p => { return p._id === selectedProject }): null;
    const title = (multiple === null) ? project[0].title: multiple.projects+" Projects";
    const videos = (multiple === null) ? project[0].videos.length: multiple.videos;
    const highlights = (multiple === null) ? project[0].highlights.length: multiple.highlights;
    const copyClass = (copy === false) ? "col s2 center-align material-icons": "col s2 center-align material-icons iconSelected";
    return (
      <div className="row" id="playerFilter">
        <div className="row">
          <div className="col s8">
            <p>{title}<br />{videos+" Videos, "+highlights+" Highlights"}</p>
          </div>
          <div className="center-align col s2">
            <i className="material-icons">settings</i>
          </div>
          <div className="center-align col s2">
            <i onClick={ () => history.push("/") } className="material-icons">home</i>
          </div>
        </div>
        <div className="row">
          <input id="playerFilterSearch" className="col s8" onChange={ e => dispatch({type: CHANGE_SEARCH_TERM, payload: e.target.value }) } placeholder="Filter for..." />
          <i className="col s2 center-align material-icons">filter_list</i>
          <i className={copyClass} onClick={ () => dispatch({ type: COPY })}>playlist_add</i>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ main: { searchTerm, filteredProjects, selectedProject, selectedProjects }, player: { copy } }) => {
  return { searchTerm, filteredProjects, selectedProject, copy, selectedProjects };
}

export default withRouter(connect(mapStateToProps)(PlayerFilter));
