import React, { Component } from 'react';
import { connect } from 'react-redux';

import { COPY_ADD_ALL } from '../actions/types';

class PlayerSort extends Component{

  render(){
    const { copy, filteredHighlights, dispatch, selectedProjects, selectedProject, projects, sequencedProject } = this.props;
    let copyIds, filterIds, checked, add;
    let project = (selectedProjects !== false) ? selectedProjects: projects.filter( p => { return p._id === selectedProject });
    project = (sequencedProject !== false) ? sequencedProject: (selectedProjects !== false) ? project: project[0];
    if (copy !== false) {
      copyIds = copy.highlights.map( h => { return h._id });
      filterIds = filteredHighlights.map( h => { return h._id });
      checked = filterIds.every( h => { return copyIds.indexOf(h) !== -1 });
      add = (checked === true) ? false: true;
    }
    const withLinks = filteredHighlights.map( h => { return { ...h, link: project.videos[h.video] } });
    const checkAll = (copy !== false) ?
      <a id="selectAll" className="col s2">
        <input type="checkbox" className="filled-in" id="checkAll" checked={checked}
          onClick={ () => dispatch({ type: COPY_ADD_ALL, payload: { add, withLinks } })} />
        <label htmlFor="checkAll"></label>
      </a>: null;
    return (
      <div id="playerSort" className="row">
        <a id="sortIndex" className="col s1">#</a>
        <a id="sortTime" className="col s1">t</a>
        <a id="sortCode" className="col s8">Text...</a>
        {checkAll}
      </div>
    )
  }
}
const mapStateToProps = ({ player: { copy }, main: { filteredHighlights, selectedProjects, selectedProject, projects, sequencedProject } }) => {
  return { copy, filteredHighlights, selectedProjects, selectedProject, projects, sequencedProject }
}
export default connect(mapStateToProps)(PlayerSort);
