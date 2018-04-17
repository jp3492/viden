import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CHANGE_PAGE } from '../actions/types';

import BodyLeft from './BodyLeft';
import BodyRight from './BodyRight';
import BodyHeader from './BodyHeader';
import Approve from './Approve';

class Body extends Component{
  componentWillMount(){
    const { auth, history } = this.props;
    if (auth === false) {
      history.push('/login');
    }
  }
  componentDidMount(){
    const { dispatch, auth } = this.props;
    dispatch({ type: CHANGE_PAGE, payload: "home" });
  }
  render(){
    const { dispatch, auth } = this.props;
    if (auth === false) {
      return null;
    }
    if (auth !== false && auth.approved === false) {
      return <Approve />
    }
    return(
      <div id="body" className="row">
        <BodyHeader />
        <BodyLeft />
        <BodyRight />
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
}
export default connect(mapStateToProps)(Body);
