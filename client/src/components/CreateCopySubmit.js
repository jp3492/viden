import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import { create_update } from '../actions';

class CreateCopySubmit extends Component{
  submitCreate(update){
    const { action, create, auth } = this.props;
    action.create_update(update, create, auth._id, create.invites);
    $('.modal').modal('close');
  }
  render(){
    return(
      <div className="modal-footer">
        <a onClick={ () => this.submitCreate(false) } id="create_btn" ref="#" className="btn waves-effect waves-green">Create</a>
      </div>
    )
  }
}
const mapStateToProps = ({ auth, main: { create } }) => {
  return { auth, create };
}

const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ create_update }, dispatch), dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCopySubmit);
