import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CHANGE_SEARCH_TERM, COPY } from '../actions/types';

class PlayerFilter extends Component{

  render(){
    const { history, dispatch, searchTerm, projects, selectedProject, copy } = this.props;
    const project = projects.filter( p => { return p._id === selectedProject });
    const { title, highlights, videos } = project[0];
    const copyClass = (copy === false) ? "col s2 center-align material-icons": "col s2 center-align material-icons iconSelected";
    return (
      <div className="row" id="playerFilter">
        <div className="row">
          <div className="col s8">
            <p>{title}<br />{videos.length+" Videos, "+highlights.length+" Highlights"}</p>
          </div>
          <div className="center-align col s2">
            <i className="material-icons">settings</i>
          </div>
          <div className="center-align col s2">
            <i onClick={ () => history.push("/") } className="material-icons">home</i>
          </div>
        </div>
        <div className="row">
          <input className="col s8" onChange={ e => dispatch({type: CHANGE_SEARCH_TERM, payload: e.target.value }) } placeholder="Filter for..." />
          <i className="col s2 center-align material-icons">filter_list</i>
          <i className={copyClass} onClick={ () => dispatch({ type: COPY })}>playlist_add</i>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ main: { searchTerm, projects, selectedProject }, player: { copy } }) => {
  return { searchTerm, projects, selectedProject, copy };
}

export default withRouter(connect(mapStateToProps)(PlayerFilter));
