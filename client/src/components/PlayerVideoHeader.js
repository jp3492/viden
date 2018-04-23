import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CV } from '../actions/types';

class PlayerVideoHeader extends Component{
  renderLink(v, i, len){
    const { dispatch, video } = this.props;
    const className = (video === i) ? "active": "";
    let width = 100 / len;
    width = `${width}%`;
    return <li key={i} onClick={ () => dispatch({ type: CV, payload: i }) } className="tab col s3" style={{ width }}><a className={className}>Video {i+1}</a></li>;
  }
  render(){
    const { history, filteredProjects, selectedProject, selectedProjects } = this.props;
    if (selectedProject === null) {
      return null;
    }
    const project = filteredProjects.filter( p => { return p._id === selectedProject });
    const videos = (selectedProjects === false) ? project[0].videos: selectedProjects.videos;
    const multiple = (selectedProjects !== false) ? { projects: selectedProjects.projects.length, videos: selectedProjects.videos.length, highlights: selectedProjects.highlights.length }: null;
    const proj = (multiple === null) ? filteredProjects.filter( p => { return p._id === selectedProject }): null;
    const title = (multiple === null) ? proj[0].title: multiple.projects+" Projects";
    const vids = (multiple === null) ? proj[0].videos.length: multiple.videos;
    const highlights = (multiple === null) ? proj[0].highlights.length: multiple.highlights;
    return (
      <div className="row" id="playerVideoHeader">
        <div className="col s2" id="playerVideoHeaderMenu">
          <div className="row">
            <div className="center-align col s2">
              <i onClick={ () => history.push("/home") } className="material-icons">home</i>
            </div>
            <div className="col s10 right-align">
              <p>{title}<br />{"V:"+vids+", H:"+highlights}</p>
            </div>
          </div>
        </div>
        <div className="col s10">
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
export default withRouter(connect(mapStateToProps)(PlayerVideoHeader));
