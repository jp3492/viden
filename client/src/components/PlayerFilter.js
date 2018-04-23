import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CHANGE_SEARCH_TERM, COPY } from '../actions/types';

class PlayerFilter extends Component{

  render(){
    const { auth, dispatch, copy } = this.props;
    const copyClass = (copy === false) ? "col s2 center-align material-icons": "col s2 center-align material-icons iconSelected";
    const multi = (auth === false) ? null: <i className={copyClass} onClick={ () => dispatch({ type: COPY })}>playlist_add</i>;
    return (
      <div id="playerFilter">
        <div className="row">
          <input id="playerFilterSearch" className="col s10" onChange={ e => dispatch({type: CHANGE_SEARCH_TERM, payload: e.target.value }) } placeholder="Filter code..." />
          {multi}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, main: { searchTerm, filteredProjects, selectedProject, selectedProjects }, player: { copy } }) => {
  return { auth, searchTerm, filteredProjects, selectedProject, copy, selectedProjects };
}

export default withRouter(connect(mapStateToProps)(PlayerFilter));
