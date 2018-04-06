import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CHANGE_SEARCH_TERM, COPY } from '../actions/types';

class PlayerFilter extends Component{

  render(){
    const { history, dispatch, searchTerm, filteredProjects, selectedProject, selectedProjects, copy } = this.props;
    const copyClass = (copy === false) ? "col s2 center-align material-icons": "col s2 center-align material-icons iconSelected";
    return (
      <div id="playerFilter">
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
