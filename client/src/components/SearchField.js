import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { search_global } from '../actions';
import { CHANGE_SEARCH_TERM } from '../actions/types';

class SearchField extends Component{
  search(term){
    const { dispatch, searchLocal, searchOption, action, auth } = this.props;
    if (searchLocal) {
      dispatch({ type: CHANGE_SEARCH_TERM, payload: term });
    } else {
      dispatch({ type: CHANGE_SEARCH_TERM, payload: { term } });
      action.search_global(searchOption, term, auth._id);
    }
  }
  render(){
    const { searchTerm, searchOption, searchLocal } = this.props;
    const where = (searchLocal === true) ? "locally": "globally";
    const placeholder = `Search ${where} for ${searchOption}...`;
    return(
      <div id="searchField" className="col s7">
        <input placeholder={placeholder} value={searchTerm} onChange={ e => this.search(e.target.value)} />
      </div>
    )
  }
}
const mapStateToProps = ({ auth, main: { searchOption, searchTerm, searchLocal } }) => {
  return { auth, searchOption, searchTerm, searchLocal };
}

const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ search_global }, dispatch), dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
