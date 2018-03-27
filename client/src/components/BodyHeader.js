import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SELECT_MULTIPLE } from '../actions/types';
import Create from './Create';

class BodyHeader extends Component{

  render(){
    const { dispatch } = this.props;
    return(
      <div id="bodyHeader" className="col s12 row">
        <div className="col s3">
          <Create />
        </div>
        <div className="col s2" id="selectMultiple">
          <button className="btn" onClick={ () => dispatch({ type: SELECT_MULTIPLE })}>MultiSelect</button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ main }) => {
  return { main }
}
export default connect(mapStateToProps)(BodyHeader);
