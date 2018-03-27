import React, { Component } from 'react';
import { connect } from 'react-redux';

import $ from 'jquery';

import { CHANGE_SEARCH_OPTION } from '../actions/types';

class SearchOption extends Component{
  componentDidMount(){
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
  }
  render(){
    const { dispatch, searchOption } = this.props;
    return(
      <div id="searchOption" className="col s2">
        <a id="changeSearchBtn" materialize="dropdown" className='dropdown-button btn folderBtn' href='#' data-activates="searchOptions">{searchOption}</a>
        <ul id="searchOptions" className='dropdown-content'>
          <li  className="center-align col s12" onClick={() => dispatch({ type: CHANGE_SEARCH_OPTION, payload: "projects" })}><a>Projects</a></li>
          <li  className="center-align col s12" onClick={() => dispatch({ type: CHANGE_SEARCH_OPTION, payload: "people" })}><a>People</a></li>

        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ main: { searchOption }}) => {
  return { searchOption };
}

export default connect(mapStateToProps)(SearchOption);
