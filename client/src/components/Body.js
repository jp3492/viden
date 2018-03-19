import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CHANGE_PAGE } from '../actions/types';

import BodyLeft from './BodyLeft';
import BodyRight from './BodyRight';
import Create from './Create';

class Body extends Component{
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({ type: CHANGE_PAGE, payload: "home" });
  }
  render(){
    const { auth } = this.props;
    if (auth === false || auth.approved === false) {
      return null;
    }
    return(
      <div id="body" className="row">
        <BodyLeft />
        <BodyRight />
        <Create />
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
}
export default connect(mapStateToProps)(Body);
