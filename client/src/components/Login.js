import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { LOG } from '../actions/types';

class Login extends Component {
  componentWillReceiveProps(nextProps){
    const { auth, history } = nextProps;
    if (auth !== false) {
      history.push('/home');
    }
  }
  componentWillMount(){
    const { auth, history } = this.props;
    if (auth !== false) {
      history.push('/home');
    }
  }
  render(){
    const { history, dispatch, log, auth } = this.props;
    const text = (auth === false && log === true) ? <b>Signing in...</b>: <b>Retrieving user data...</b>
    const button = (auth === false && log === true) ?
      (
        <div>
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
          {text}
        </div>
      ): <a className="btn red" href="/auth/google" onClick={ () => dispatch({ type: LOG })}>Google OAuth</a>;
    return (
      <div className="valign-wrapper" id="login">
        <div className="row">
         <div className="col s12">
           <div className="card">
             <div className="card-content">
               <span className="card-title"><h4 id="loginHeader">Viden</h4><b>An Interactive Online Video Player and Playlist Creation Tool</b></span><div className="divider"></div><br/>
               <p>We provide a simple to user, interactive video player for video analysis and playlist creation. You can use any video hosted on popular
               online streaming services. Supported platforms:</p><br/>
               <p><b>YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion</b></p><br/>
               <p>Viden.pro is currently in early beta! You can register with supported authentication services below, but access will need approval.
               Please contact me directly to request access and give a brief description on your intended use.</p><br/>
               <p><b>Note</b>: my main focus at the moment is to provide a useful tool for sports video analysis and educational purposes.</p>
             </div>
             <div className="card-action">
               {button}
             </div>
           </div>
         </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ auth, main: { log } }) => {
  return { auth, log }
}
export default withRouter(connect(mapStateToProps)(Login));
