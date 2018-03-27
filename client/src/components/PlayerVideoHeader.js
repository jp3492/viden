import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CV } from '../actions/types';

class PlayerVideoHeader extends Component{
  renderLink(v, i, len){
    const { dispatch, video } = this.props;
    const className = (video === i) ? "active": "";
    let width = 100 / len;
    width = `${width}%`;
    return <li onClick={ () => dispatch({ type: CV, payload: i }) } className="tab col s3" style={{ width }}><a className={className}>Video {i}</a></li>;
  }
  render(){
    const { filteredProjects, selectedProject, selectedProjects } = this.props;
    console.log(this.props);
    const project = filteredProjects.filter( p => { return p._id === selectedProject });
    const videos = (selectedProjects === false) ? project[0].videos: selectedProjects.videos;
    return (
      <div className="row" id="playerVideoHeader">
        <div className="col s12">
          <ul className="tabs">
            {videos.map( (v,i) => this.renderLink(v,i, videos.length))}
          </ul>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ player: { video, players, videos }, main: { selectedProject, selectedProjects, filteredProjects } }) => {
  return { video, players, selectedProject, selectedProjects, filteredProjects };
}
export default connect(mapStateToProps)(PlayerVideoHeader);
