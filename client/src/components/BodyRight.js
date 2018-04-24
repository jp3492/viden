import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from './User';
import Project from './Project';
import Sequence from './Sequence';

class BodyRight extends Component{
  renderMap(view, o, s){
    if (s === true) {
      const { start, stop, video, comment, link, project, _id } = o;
      const { dispatch } = this.props;
      return <Sequence start={start} stop={stop} comment={comment} link={link} project={project} id={_id} />
    }
    if (view === "groups") {
      const { firstName, lastName, _id } = o;
      return <User firstName={firstName} lastName={lastName} id={_id} />;
    }
    const { title, description, parent, _id } = o;
    return <Project title={title} description={description} parent={parent} id={_id} />;
  }
  render(){
    const { view, filteredProjects, filteredFriends, searchOption, searchTerm, filteredSequences } = this.props;
    const sequences = (searchOption === "sequences") ? true: false;
    const mapOver = (sequences === true) ? filteredSequences: (view === "groups") ? filteredFriends: filteredProjects;
    return(
      <ul id="bodyRight" className="col s9 collection">
        {mapOver.map( o => this.renderMap(view, o, sequences))}
      </ul>
    )
  }
}
const mapStateToProps = ({ main: { view, filteredProjects, filteredFriends, searchOption, searchTerm, filteredSequences }}) => {
  return { view, filteredProjects, filteredFriends, searchOption, searchTerm, filteredSequences  };
}

export default connect(mapStateToProps)(BodyRight);
