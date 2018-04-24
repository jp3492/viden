import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SELECT_SEQUENCE, ADD_SEQUENCE } from '../actions/types';

class Sequence extends Component{
  render(){
    const { dispatch, start, stop, comment, link, project, id, selectedSequence, selectedSequences } = this.props;
    const className = (selectedSequence === id) ? "collection-item projectSelected row": "collection-item row";
    const checked = (selectedSequences === false) ? false: (selectedSequences.indexOf(id) !== -1) ? true: false;
    const multiple = (selectedSequences !== false) ?
      <a id={`checkbox${id}`} onClick={ e => {
        e.preventDefault();
        dispatch({ type: ADD_SEQUENCE, payload: id });
         } }>
          <input type="checkbox" className="filled-in" id={id} checked={checked} />
          <label htmlFor={id}></label>
      </a>: null;
    return(
      <li className={className} onClick={ () => dispatch({ type: SELECT_SEQUENCE, payload: id })}>
        <div><div className="col s3 row"><div className="col s1">{multiple}</div>{comment}</div><div className="col s3">{start+" -> "+stop}</div></div>
      </li>
    )
  }
}
const mapStateToProps = ({ main: { selectedSequence, selectedSequences } }) => {
  return { selectedSequence, selectedSequences };
}

export default connect(mapStateToProps)(Sequence);
