import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerHeader extends Component{
  renderVideos(v, i, video){
    const className = (video === i) ? "active": "";
    return <li className="tab col s3"><a className={className}>{`video${i}`}</a></li>
  }
  render(){
    const { player, selectedProject, projects } = this.props;
    let videos = projects.filter( p => { return p._id === selectedProject });
    videos = videos[0].videos;
    return (
      <div className="row">
        <div className="col s1">
          Home/Settings
        </div>
        <div className="col s11">
          <ul className="tabs" id="videoTabs">
            {videos.map( (v, i) => this.renderVideos(v, i, player.video))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ main: { projects, selectedProject }, player }) => {
  return { player, projects, selectedProject };
}


export default connect(mapStateToProps)(PlayerHeader);
