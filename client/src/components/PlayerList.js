import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { SELECT_HIGHLIGHT, EDIT, COPY_ADD } from '../actions/types';

class PlayerList extends Component{
  selectHighlight(video, i, st, sp, com){
    const { dispatch, players, selectedProject, projects, filteredHighlights } = this.props;
    const { start, stop } = filteredHighlights[i];
    dispatch({ type: SELECT_HIGHLIGHT, payload: { video: video, highlight: i, start: st, stop: sp, comment: com } })
  }
  renderHighlights(h, i, videos){
    const { start, stop, comment, _id, video } = h;
    const { dispatch, highlight, players, filteredHighlights, copy } = this.props;
    const selectedHighlight = filteredHighlights[highlight];
    const className = (highlight === i) ? "collection-item selectedHighlight": "collection-item";
    const inCopy = (copy !== false) ? copy.highlights.filter( h => { return h._id === _id }): [];
    const defaultChecked = (inCopy.length !== 0) ? true: false;
    const copying = (copy !== false) ?
      <a id={`checkbox${i}`} className="secondary-content" onClick={ e => {
        e.preventDefault();
        dispatch({ type: COPY_ADD, payload: { start, stop, comment, video, link: videos[video], _id } }); } }><p>
        <input type="checkbox" className="filled-in" id={`check${i}`} checked={defaultChecked} />
        <label htmlFor={`check${i}`}></label>
      </p></a>: null;
    return <li
      onDoubleClick={ () => dispatch({ type: EDIT, payload: { comment: selectedHighlight.comment, start: selectedHighlight.start, stop: selectedHighlight.stop } })}
      id={i} className={className}>
      <a onClick={ () => this.selectHighlight(video, i, start, stop, comment)} >{start+" "+stop+" "+comment}</a>{copying}</li>;
  }
  render(){
    const { projects, selectedProject, filteredHighlights } = this.props;
    const project = projects.filter( p => { return p._id === selectedProject });
    const highlights = _.sortBy(filteredHighlights, "start");
    return(
      <ul id="playerList" className="collection">
        {filteredHighlights.map( (h, i) => this.renderHighlights(h, i, project[0].videos))}
      </ul>
    )
  }
}

const mapStateToProps = ({ main: { selectedProject, projects, filteredHighlights }, player: { highlight, players, video, copy } }) => {
  return { selectedProject, projects, highlight, players, video, filteredHighlights, copy };
}

export default connect(mapStateToProps)(PlayerList);
