import React, { Component } from 'react';

import SearchOption from './SearchOption';
import SearchField from './SearchField';
import SearchClear from './SearchClear';

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
