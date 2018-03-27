import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SELECT_MULTIPLE } from '../actions/types';
import Create from './Create';

class BodyHeader extends Component{
  multi(){
    const { dispatch, view } = this.props;
    if (view !== "groups") {
      return (
        <div className="col s2" id="selectMultiple">
          <button className="btn" onClick={ () => dispatch({ type: SELECT_MULTIPLE })}>MultiSelect</button>
        </div>
      )
    }
    return null;
  }
  render(){
    return(
      <div id="bodyHeader" className="col s12 row">
        <div className="col s3">
          <Create />
        </div>
        {this.multi()}
      </div>
    )
  }
}
const mapStateToProps = ({ main: { view } }) => {
  return { view }
}
export default connect(mapStateToProps)(BodyHeader);
