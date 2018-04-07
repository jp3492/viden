import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LOGOUT } from '../actions/types';
class Approve extends Component {
  componentDidMount(){
    const { auth, history } = this.props;
    if (auth === false) {
      history.push('/login');
    }
  }
  render(){
    const { history, dispatch } = this.props;
    return (
      <div id="approve">
        <div className="row">
         <div className="col s12">
           <div className="card">
             <div className="card-content">
               <span className="card-title"><h4 id="loginHeader">Waiting for approval!</h4></span><div className="divider"></div><br/>
               <p><b>Your account has not been approved yet. Waiting for admins approval!</b></p><br/>
               <p>We are working on a KYC (know your customer) process during beta to improve tester to developer feedback and to keep better control over missuse!</p>
               <p>If your account is not being approved in a few days after registration, please contact us directly. If you werent referred by an existing user,
                nor you know us personally, you will not be granted access during early beta testing.</p>
             </div>
             <div className="card-action">
              <a className="btn red" onClick={ () => { dispatch({ type: LOGOUT }); history.push('/login') } }>Sign in with a different account</a>
             </div>
           </div>
         </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
}
export default withRouter(connect(mapStateToProps)(Approve));
