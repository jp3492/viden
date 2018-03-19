import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { SELECT_HIGHLIGHT, EDIT } from '../actions/types';

class PlayerList extends Component{
  selectHighlight(video, i, st, sp, com){
    const { dispatch, players, selectedProject, projects, filteredHighlights } = this.props;
    const { start, stop } = filteredHighlights[i];
    dispatch({ type: SELECT_HIGHLIGHT, payload: { video: video, highlight: i, start: st, stop: sp, comment: com } })
  }
  renderHighlights(h, i){
    const { start, stop, comment, _id, video } = h;
    const { dispatch, highlight, players, filteredHighlights } = this.props;
    const selectedHighlight = filteredHighlights[highlight];
    const className = (highlight === i) ? "collection-item selectedHighlight": "collection-item";
    return <li
      onClick={ () => this.selectHighlight(video, i, start, stop, comment)}
      onDoubleClick={ () => dispatch({ type: EDIT, payload: { comment: selectedHighlight.comment, start: selectedHighlight.start, stop: selectedHighlight.stop } })}
      id={i} className={className}>{start+" "+stop+" "+comment}</li>;
  }
  render(){
    const { projects, selectedProject, filteredHighlights } = this.props;
    const project = projects.filter( p => { return p._id === selectedProject });
    const highlights = _.sortBy(filteredHighlights, "start");
    return(
      <ul id="playerList" className="collection">
        {filteredHighlights.map( (h, i) => this.renderHighlights(h, i))}
      </ul>
    )
  }
}

const mapStateToProps = ({ main: { selectedProject, projects, filteredHighlights }, player: { highlight, players, video } }) => {
  return { selectedProject, projects, highlight, players, video, filteredHighlights };
}

export default connect(mapStateToProps)(PlayerList);
