import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchHighlight } from '../actions';

class Loading extends Component {
  componentWillMount(){
    if (this.props.match.params.id) {
      this.props.fetchHighlight(this.props.match.params.id, this.props.history);
    }else {
      this.props.history.push("/");
    }
  }
  render(){
    return(
      <div>Loading</div>
    )
  }
}
const mapStateToProps = ({ highlights }) => {
  return { highlights }
}
export default connect(null, {fetchHighlight})(Loading);
