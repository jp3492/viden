import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CHANGE_SEARCH_TERM, CHANGE_SEARCH_LOCAL } from '../actions/types';

class ClearSearch extends Component{
  render(){
    const { dispatch, searchTerm, searchLocal } = this.props;
    const className = (searchLocal === false) ? "col s6 localOn": "col s6 localOff";
    const clear = (searchTerm !== "") ? (
      <a onClick={() => dispatch({ type: CHANGE_SEARCH_TERM, payload: "" }) } className="col s6">
        <i className="material-icons">
          clear
        </i>
      </a>
    ): null;
    return(
      <div id="clearSearch" className="col s1">
      <div className="row">
        <a className={className} onClick={ () => dispatch({ type: CHANGE_SEARCH_LOCAL })}>
          <i className='material-icons'>
            public
          </i>
        </a>
        {clear}
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ main: { searchTerm, searchLocal } }) => {
  return { searchTerm, searchLocal };
}

export default connect(mapStateToProps)(ClearSearch);
