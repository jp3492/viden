import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CV, DISABLE_VIDEO } from '../actions/types';

class PlayerVideoHeader extends Component{
  renderLink(v, i, len){
    const { dispatch, video, disabledVideos } = this.props;
    const className = (video === i) ? "active row": "row";
    const checked = (disabledVideos.indexOf(i) !== -1) ? false: true;
    let width = 100 / len;
    width = `${width}%`;
    return (
      <li key={i} className="tab col s3" style={{ width }}>
        <a className={className}>
          <a className="col s10" onClick={ () => dispatch({ type: CV, payload: i }) }>Video {i+1}</a>
          <a id={`checktab${i}`} className="secondary-content col s1" onClick={ e => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: DISABLE_VIDEO, payload: i }); } }>
            <input type="checkbox" className="filled-in" id={`vidTab${i}`} checked={checked}/>
            <label htmlFor={`vidTab${i}`}></label>
          </a>
        </a>
      </li>
    )
  }
  render(){
    const { history, filteredProjects, selectedProject, selectedProjects, sequencedProject } = this.props;
    if (selectedProject === null && sequencedProject === false) {
      return null;
    }
    const project = filteredProjects.filter( p => { return p._id === selectedProject });
    const videos = (sequencedProject !== false) ? sequencedProject.videos: (selectedProjects === false) ? project[0].videos: selectedProjects.videos;
    const multiple = (sequencedProject !== false) ? null: (selectedProjects !== false) ? { projects: selectedProjects.projects.length, videos: selectedProjects.videos.length, highlights: selectedProjects.highlights.length }: null;
    const proj = (sequencedProject !== false) ? null: (multiple === null) ? filteredProjects.filter( p => { return p._id === selectedProject }): null;
    const title = (sequencedProject !== false) ? "Sequenced Project": (multiple === null) ? proj[0].title: multiple.projects+" Projects";
    const vids = (sequencedProject !== false) ? sequencedProject.videos.length: (multiple === null) ? proj[0].videos.length: multiple.videos;
    const highlights = (sequencedProject !== false) ? sequencedProject.highlights.length: (multiple === null) ? proj[0].highlights.length: multiple.highlights;
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
const mapStateToProps = ({ player: { video, players, videos }, main: { disabledVideos, selectedProject, selectedProjects, filteredProjects, sequencedProject } }) => {
  return { video, players, selectedProject, selectedProjects, filteredProjects, sequencedProject, disabledVideos };
}
export default withRouter(connect(mapStateToProps)(PlayerVideoHeader));
