import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from './User';
import Project from './Project';

class BodyRight extends Component{
  renderMap(view, o){
    if (view === "groups") {
      const { firstName, lastName, _id } = o;
      return <User firstName={firstName} lastName={lastName} id={_id} />;
    }
    const { title, description, parent, _id } = o;
    return <Project title={title} description={description} parent={parent} id={_id} />;
  }
  render(){
    const { dispatch, view, filteredProjects, filteredFriends } = this.props;
    const mapOver = (view === "groups") ? filteredFriends: filteredProjects;
    return(
      <div>
        <ul id="bodyRight" className="col s9 collection">
          {mapOver.map( o => this.renderMap(view, o))}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { view, filteredProjects, filteredFriends }}) => {
  return { view, filteredProjects, filteredFriends };
}

export default connect(mapStateToProps)(BodyRight);
