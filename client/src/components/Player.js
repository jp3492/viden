import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import PlayerVideo from './PlayerVideo';
import PlayerList from './PlayerList';
import PlayerControls from './PlayerControls';
import PlayerEdit from './PlayerEdit';
import PlayerHeader from './PlayerHeader';
import PlayerFilter from './PlayerFilter';
import PlayerVideoHeader from './PlayerVideoHeader';
import PlayerInitiate from './PlayerInitiate';

import { SELECT_PROJECT } from '../actions/types';
import { getProject } from '../actions';

class Player extends Component{
  //needed: filteredHighlights, selectedProject, selectedProjects
  componentWillMount(){
    const { auth, selectedProject, action: { getProject }, projects, dispatch, history } = this.props;
    if (this.props.match.params.id !== selectedProject) {
      const project = (projects !== undefined) ? projects.filter( p => { return p._id === this.props.match.params.id }): [];
      if (project.length === 0) {
        getProject(this.props.match.params.id);
      } else {
        dispatch({ type: SELECT_PROJECT, payload: this.props.match.params.id });
      }
    }
  }
  render(){
    const { projects, selectedProject } = this.props;
    if (projects === [] || selectedProject === null) {
      return <PlayerInitiate />
    }
    return(
      <div id="player" className="row">
        <PlayerInitiate />
        <div id="playerLeft" className="col l9 m10 s12">
          <PlayerVideoHeader />
          <PlayerVideo />
          <PlayerControls />
        </div>
        <div id="playerRight" className="col l3 m2 s12">
          <PlayerFilter />
          <PlayerList />
          <PlayerEdit />
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ auth, main: { selectedProject, selectedProjects, projects } }) => {
  return { selectedProject, selectedProjects, auth, projects }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ getProject }, dispatch), dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Player));
