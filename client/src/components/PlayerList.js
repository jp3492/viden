import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { SELECT_HIGHLIGHT, EDIT, COPY_ADD } from '../actions/types';

class PlayerList extends Component{
  selectHighlight(video, i){
    const { dispatch } = this.props;
    dispatch({ type: SELECT_HIGHLIGHT, payload: { video, highlight: i } })
  }
  renderHighlights(h, i, videos){
    const { start, stop, comment, _id, video } = h;
    const { dispatch, highlight, filteredHighlights, copy } = this.props;
    const selectedHighlight = filteredHighlights[highlight];
    const className = (highlight === i) ? "collection-item selectedHighlight": "collection-item";
    const inCopy = (copy !== false) ? copy.highlights.filter( h => { return h._id === _id }): [];
    const defaultChecked = (inCopy.length !== 0) ? true: false;
    const copying = (copy !== false) ?
      <a id={`checkbox${i}`} className="secondary-content" onClick={ e => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: COPY_ADD, payload: { start, stop, comment, video, link: videos[video], _id } }); } }>
        <input type="checkbox" className="filled-in" id={`check${i}`} checked={defaultChecked} />
        <label htmlFor={`check${i}`}></label>
      </a>: null;
    return <li
      key={i}
      onDoubleClick={ () => dispatch({ type: EDIT, payload: { comment: selectedHighlight.comment, start: selectedHighlight.start, stop: selectedHighlight.stop } })}
      onClick={ () => this.selectHighlight(video, i)}
      id={`highlight${i}`} className={className}>
        <a className="listIndex col s1">{i}</a>
        <a className="listTime col s1">{start}</a>
        <a className="listCode col s9">{comment}</a>
        <a className="listCopy col s1">{copying}</a>
      </li>;
  }
  render(){
    const { filteredProjects, selectedProject, filteredHighlights, selectedProjects, sequencedProject } = this.props;
    if (selectedProject === null && sequencedProject === false) {
      return null;
    }
    const project = filteredProjects.filter( p => { return p._id === selectedProject });
    const highlights = (sequencedProject !== false) ? _.sortBy(sequencedProject.highlights, "start"): _.sortBy(filteredHighlights, "start");
    const videos = (sequencedProject !== false) ? sequencedProject.videos: (selectedProjects === false) ? project[0].videos: selectedProjects.videos;
    return(
      <ul id="playerList" className="collection">
        {highlights.map( (h, i) => this.renderHighlights(h, i, videos))}
      </ul>
    )
  }
}

const mapStateToProps = ({ main: { selectedProject, filteredProjects, filteredHighlights, selectedProjects, sequencedProject }, player: { highlight, players, video, copy } }) => {
  return { selectedProject, filteredProjects, highlight, players, video, filteredHighlights, copy, selectedProjects, sequencedProject };
}

export default connect(mapStateToProps)(PlayerList);
