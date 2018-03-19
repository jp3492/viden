import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchFilter extends Component{
  render(){

    return(
      <div id="search" className="col s1">
        <button className="btn">Filter</button>
      </div>
    )
  }
}

export default SearchFilter;
