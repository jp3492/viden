import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchOption from './SearchOption';
import SearchField from './SearchField';
import SearchClear from './SearchClear';
import SearchFilter from './SearchFilter';

class Search extends Component{
  render(){

    return(
      <div id="search" className="col s9">
        <SearchField />
        <SearchClear />
        <SearchOption />
      </div>
    )
  }
}

export default Search;
