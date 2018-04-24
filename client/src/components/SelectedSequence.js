import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { viewSequences } from '../actions';

class SelectedSequence extends Component{
  renderSequence(s){
    const { start, stop, comment, link, project, _id } = s;
    return <div className="collection-item">{comment+start+stop}</div>
  }
  render(){
    const { selectedSequences, filteredSequences, action: { viewSequences }, history } = this.props;
    const mapOver = (selectedSequences !== false) ? filteredSequences.filter( s => { return selectedSequences.indexOf(s._id) !== -1 }): [];
    return (
      <div id="selectedSequences">
        <span className="card-title">Selected Sequences</span>
        <div className="collection">{mapOver.map( s => this.renderSequence(s))}</div>
        <a className="btn" onClick={ () => viewSequences(mapOver, history) }>View Sequences</a>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { selectedSequences, filteredSequences } }) => {
  return { selectedSequences, filteredSequences };
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ viewSequences }, dispatch), dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectedSequence));
