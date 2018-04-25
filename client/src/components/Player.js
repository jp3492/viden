import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import PlayerVideo from './PlayerVideo';
import PlayerList from './PlayerList';
import PlayerControls from './PlayerControls';
import PlayerEdit from './PlayerEdit';
import PlayerFilter from './PlayerFilter';
import PlayerVideoHeader from './PlayerVideoHeader';
import PlayerInitiate from './PlayerInitiate';
import PlayerSort from './PlayerSort';

import { SELECT_PROJECT, CHANGE_PAGE } from '../actions/types';
import { getProject } from '../actions';

class Player extends Component{
  shouldComponentUpdate(nextProps, nextState){
    console.log("notupdating");
    return false;
  }
  componentWillMount(){
    const { selectedProject, action: { getProject }, projects, dispatch, site, sequencedProject } = this.props;
    if (site === "home") {
      dispatch({ type: CHANGE_PAGE, payload: "player" });
    }
    if (sequencedProject !== false) {
      return null;
    }
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
    const { projects, selectedProject, match } = this.props;
    if (match.path === "/player/:id" && match.url === "/player/sequenced") {
      return null;
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
          <PlayerSort />
          <PlayerList />
          <PlayerEdit />
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ auth, main: { selectedProject, selectedProjects, projects, site, sequencedProject } }) => {
  return { selectedProject, selectedProjects, auth, projects, site, sequencedProject }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ getProject }, dispatch), dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Player));
